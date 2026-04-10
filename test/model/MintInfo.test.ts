import { describe, it, expect, vi } from 'vitest';
import { MintInfo } from '../../src/model/MintInfo';
import { MINTINFORESP } from '../consts';

describe('MintInfo protected endpoint matching', () => {
  it('matches exact literal path', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        22: {
          bat_max_mint: 100,
          protected_endpoints: [{ method: 'POST', path: '/v1/swap' }],
        },
      },
    });
    expect(info.requiresBlindAuthToken('POST', '/v1/swap')).toBe(true);
    expect(info.requiresBlindAuthToken('POST', '/v1/swap/')).toBe(false);
    expect(info.requiresBlindAuthToken('POST', '/v1/swapx')).toBe(false);
    expect(info.requiresBlindAuthToken('GET', '/v1/swap')).toBe(false);
  });

  it('matches exact anchored path ^...$', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        22: {
          bat_max_mint: 100,
          protected_endpoints: [{ method: 'POST', path: '^/v1/mint/bolt11$' }],
        },
      },
    });
    expect(info.requiresBlindAuthToken('POST', '/v1/mint/bolt11')).toBe(true);
    expect(info.requiresBlindAuthToken('POST', '/v1/mint/bolt11/')).toBe(false);
    expect(info.requiresBlindAuthToken('POST', '/v1/mint/bolt11/extra')).toBe(false);
  });

  it('matches prefix pattern ^/path/.*', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        22: {
          bat_max_mint: 100,
          protected_endpoints: [{ method: 'GET', path: '^/v1/mint/quote/bolt11/.*' }],
        },
      },
    });
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt11/')).toBe(true);
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt11/abc123')).toBe(true);
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt11')).toBe(false);
    expect(info.requiresBlindAuthToken('POST', '/v1/mint/quote/bolt11/abc')).toBe(false);
  });

  it('matches prefix pattern ^/path/.*$', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        22: {
          bat_max_mint: 100,
          protected_endpoints: [{ method: 'POST', path: '^/v1/melt/.*$' }],
        },
      },
    });
    expect(info.requiresBlindAuthToken('POST', '/v1/melt/')).toBe(true);
    expect(info.requiresBlindAuthToken('POST', '/v1/melt/quote/bolt11')).toBe(true);
    expect(info.requiresBlindAuthToken('POST', '/v1/melt')).toBe(false);
  });

  it('matches prefix pattern /path/*', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        22: {
          bat_max_mint: 100,
          protected_endpoints: [{ method: 'GET', path: '/v1/mint/quote/bolt*' }],
        },
      },
    });
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt11/')).toBe(true);
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt11/abc123')).toBe(true);
    expect(info.requiresBlindAuthToken('GET', '/v1/mint/quote/bolt12')).toBe(true);
    expect(info.requiresBlindAuthToken('GET', '/v1/melt/quote')).toBe(false);
    expect(info.requiresBlindAuthToken('POST', '/v1/mint/quote/bolt11/abc')).toBe(false);
    expect(info.requiresBlindAuthToken('GET', '/v1/melt/quote/bolt12')).toBe(false);
  });

  it('maps NUT-19 ttl null to Infinity', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        19: {
          ttl: null,
          cached_endpoints: [{ method: 'GET', path: '/v1/keys' }],
        },
      },
    } as any);
    expect(info.isSupported(19)).toEqual({
      supported: true,
      params: {
        ttl: Infinity,
        cached_endpoints: [{ method: 'GET', path: '/v1/keys' }],
      },
    });
  });

  it('preserves AmountLike min/max amounts; normalizes metadata integers at construction', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        4: {
          disabled: false,
          methods: [{ method: 'bolt11', unit: 'sat', min_amount: 1n, max_amount: 2n }],
        },
        5: {
          disabled: false,
          methods: [{ method: 'bolt11', unit: 'sat', min_amount: 3n, max_amount: 4n }],
        },
        19: {
          ttl: 30n,
          cached_endpoints: [{ method: 'GET', path: '/v1/keys' }],
        },
        22: {
          bat_max_mint: 5n,
          protected_endpoints: [{ method: 'POST', path: '/v1/swap' }],
        },
      },
    } as any);

    // min/max amounts are AmountLike — wire bigint values pass through as-is
    expect(info.nuts['4'].methods[0].min_amount).toBe(1n);
    expect(info.nuts['4'].methods[0].max_amount).toBe(2n);
    expect(info.nuts['5'].methods[0].min_amount).toBe(3n);
    expect(info.nuts['5'].methods[0].max_amount).toBe(4n);
    // metadata integers (ttl, bat_max_mint) are still normalized to safe numbers
    expect(info.nuts['19']?.ttl).toBe(30);
    expect(info.nuts['22']?.bat_max_mint).toBe(5);
    expect(info.isSupported(19)).toEqual({
      supported: true,
      params: {
        ttl: 30_000,
        cached_endpoints: [{ method: 'GET', path: '/v1/keys' }],
      },
    });
  });

  it('rejects out-of-range bigint info metadata at construction', () => {
    expect(
      () =>
        new MintInfo({
          ...MINTINFORESP,
          nuts: {
            19: {
              ttl: 9007199254740993n,
              cached_endpoints: [{ method: 'GET', path: '/v1/keys' }],
            },
          },
        } as any),
    ).toThrow('nuts.19.ttl');
  });
});

describe('MintInfo NUT-29 batch minting info', () => {
  it('returns supported:false when nuts["29"] is absent', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
      },
    });
    expect(info.isSupported(29)).toEqual({ supported: false });
  });

  it('returns supported:true with correct params when both max_batch_size and methods are present', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: 100, methods: ['bolt11', 'bolt12'] },
      },
    } as any);
    expect(info.isSupported(29)).toEqual({
      supported: true,
      params: { max_batch_size: 100, methods: ['bolt11', 'bolt12'] },
    });
  });

  it('returns supported:true with params when max_batch_size is omitted', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { methods: ['bolt11'] },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params).toEqual({ methods: ['bolt11'] });
  });

  it('returns supported:true with params when methods is omitted', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: 50 },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params).toEqual({ max_batch_size: 50 });
  });

  it('normalizes non-integer max_batch_size to integer', () => {
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: '100' as any },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBe(100);
  });

  it('does not throw when max_batch_size is a float — treats as unset', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: 2.5, methods: ['bolt11'] },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('malformed'),
      expect.objectContaining({ value: 2.5 }),
    );
    spy.mockRestore();
  });

  it('does not throw when max_batch_size is NaN — treats as unset', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: NaN },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('malformed'),
      expect.objectContaining({ value: NaN }),
    );
    spy.mockRestore();
  });

  it('does not throw when max_batch_size is negative — treats as unset', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: -1 },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('malformed'),
      expect.objectContaining({ value: -1 }),
    );
    spy.mockRestore();
  });

  it('clamps max_batch_size above 100 to 100', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: 500 },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBe(100);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('clamped'),
      expect.objectContaining({ advertised: 500, clampedTo: 100 }),
    );
    spy.mockRestore();
  });

  it('does not clamp max_batch_size of exactly 100', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const info = new MintInfo({
      ...MINTINFORESP,
      nuts: {
        ...MINTINFORESP.nuts,
        29: { max_batch_size: 100 },
      },
    } as any);
    const result = info.isSupported(29);
    expect(result.supported).toBe(true);
    expect(result.params?.max_batch_size).toBe(100);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
