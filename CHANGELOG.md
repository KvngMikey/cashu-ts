# Changelog

## [3.5.0](https://github.com/KvngMikey/cashu-ts/compare/v3.4.0...v3.5.0) (2026-02-05)


### Features

* add getTokenMetadata ([2d8f2b6](https://github.com/KvngMikey/cashu-ts/commit/2d8f2b638af1dc96f931fa3479f54f44b0f6cfc5))
* add getTokenMetadata (v3) ([1cb41bd](https://github.com/KvngMikey/cashu-ts/commit/1cb41bd14532640877fbd47467753de1e81efa32))
* add incompleteProofs ([42c6b1b](https://github.com/KvngMikey/cashu-ts/commit/42c6b1be24a2b5a92f45eecec41777a0293da8b4))
* add new glob prefix wildcard match for nut-21/22 ([3dfcd70](https://github.com/KvngMikey/cashu-ts/commit/3dfcd70ff5846c58a8eb0913932c8420b3ad7004))
* add new glob prefix wildcard match for nut-21/22 ([77c544a](https://github.com/KvngMikey/cashu-ts/commit/77c544a411b166612fd4797f07836141404607e9))
* added encoding methods to PaymentRequest ([8930bd8](https://github.com/KvngMikey/cashu-ts/commit/8930bd8bbd626d8a42234f53f49c62d2184a0259))
* Additional NUT-11 tags. Adds AddTag/AddTags to P2PKBuilder, additionalTags option in P2PKOptions, tag handling in OutputData, plus tests ([5c46220](https://github.com/KvngMikey/cashu-ts/commit/5c462202f1945d98ea14755300cc0d93e61eb02f))
* Adds public decodeToken method to properly rehydrate tokens with keyset ids ([4154922](https://github.com/KvngMikey/cashu-ts/commit/415492254d62ee9b5c7c752b845797042f8414bf))
* **cbor:** add encoder/decoder guardrails and per-vector test harness ([9489932](https://github.com/KvngMikey/cashu-ts/commit/9489932b540807142a33dde2691fd74f1e1e94bc))
* **ci:** add release automation and husky ([5293eb3](https://github.com/KvngMikey/cashu-ts/commit/5293eb393f4644d8fe4678c1a5f924caab16ebcb))
* **ci:** add release automation and husky ([6bf4492](https://github.com/KvngMikey/cashu-ts/commit/6bf44923188defbef2b3a7b98f68fb16d940a6f6))
* **ci:** streamline integration and add renovate ([c3f7bd7](https://github.com/KvngMikey/cashu-ts/commit/c3f7bd728fdbf3e3bed2dba8d935b4238c39b29c))
* **ci:** streamline integration and add renovate ([0df2fad](https://github.com/KvngMikey/cashu-ts/commit/0df2fad874a439160fa740513a24fc2d3a8a06d7))
* update Keyset ID V2 derivation to latest spec ([9e62790](https://github.com/KvngMikey/cashu-ts/commit/9e627905a5c060035095adbe0911a94530a0ef94))
* update Keyset ID V2 derivation to latest spec ([c82c40d](https://github.com/KvngMikey/cashu-ts/commit/c82c40d85a38402e27b13c50050a3800973178a2))
* widen signP2PKProof(s) to accept PrivKey (string | Uint8Array) ([b0b08f4](https://github.com/KvngMikey/cashu-ts/commit/b0b08f43d32edc6039926a3343ff908c980b6f55))


### Bug Fixes

* accept top-level description flag for nutshell 0.16.4 compatibility to make CI pass. ([43f6859](https://github.com/KvngMikey/cashu-ts/commit/43f685951c185a62aa17412ca3782c19903fac81))
* add accurate BOLT-11 HRP amount detection and enforce amountless rules, move check to utility and add a test case ([25f7d9d](https://github.com/KvngMikey/cashu-ts/commit/25f7d9dbdb9d96f41b49e1a6f5ee52b5b86ee3be))
* added proofsWeHave back to Wallet.send ([1566cc9](https://github.com/KvngMikey/cashu-ts/commit/1566cc982fca103508f1438dd7ce1091549b273b))
* address Noble v2 breaking changes ([715735c](https://github.com/KvngMikey/cashu-ts/commit/715735c873e3fec17e88792a2ab527957f88d1fd))
* autocounters did not advance with manual counters ([28fdc09](https://github.com/KvngMikey/cashu-ts/commit/28fdc09d821dbf44ae221955747cde16fd816fc3))
* autocounters did not advance with manual counters ([b5fe3d1](https://github.com/KvngMikey/cashu-ts/commit/b5fe3d129d6b908bbb460eded71bec7140716255))
* **ci:** add missing permission ([95e2bd9](https://github.com/KvngMikey/cashu-ts/commit/95e2bd9a6146653c0c573d9cf6e0d91fb1a6c58b))
* **ci:** add missing permission ([05182da](https://github.com/KvngMikey/cashu-ts/commit/05182da1807cedea3eab69773eb6f132c5813fe4))
* cleaned up ([235c500](https://github.com/KvngMikey/cashu-ts/commit/235c5009bcaea550f99e7b36cb79372778aafc2d))
* core tests were not running ([9301cdf](https://github.com/KvngMikey/cashu-ts/commit/9301cdfc96139d9146c39c61f7c111bed80dc5c3))
* enforce amountMsat only for amountless invoices ([d33a8db](https://github.com/KvngMikey/cashu-ts/commit/d33a8dbe363ec3b8c0dac2e12f75e58411d45104))
* **fromBase64:** Buffer needs base64url to base64 normalization too ([f88d678](https://github.com/KvngMikey/cashu-ts/commit/f88d67883e79e1fb81dcd7a38d01bdaf5ae74520))
* handle prefix in getTokenMetadata and refactor removePrefix ([b8298c1](https://github.com/KvngMikey/cashu-ts/commit/b8298c1901f23f53edd4fa421f6792fac71aef8b))
* make regex case insensitive ([18f9788](https://github.com/KvngMikey/cashu-ts/commit/18f978857b1d723a30f7d62749a74f60b4c74e33))
* make sure unlocked mint quotes can be passed to _mintProofs ([631ee45](https://github.com/KvngMikey/cashu-ts/commit/631ee45099290059165404117d9ec7b814324f1b))
* pr tasks ([a6ef065](https://github.com/KvngMikey/cashu-ts/commit/a6ef065b709174e5b389dc3738dd3a5668f8165f))
* removed leftover console.logs ([7dcd135](https://github.com/KvngMikey/cashu-ts/commit/7dcd13593559981c9ec89f46a5959a282863c4fa))
* resolve conflict ([0d23d57](https://github.com/KvngMikey/cashu-ts/commit/0d23d579503929bc6a3ccd00013800709b220195))
* standalone asset build in CI ([950ae54](https://github.com/KvngMikey/cashu-ts/commit/950ae5495273cea30578a84d67934a42eb140f0d))
* standalone asset build in CI ([2cc1138](https://github.com/KvngMikey/cashu-ts/commit/2cc1138bc195edd4566e69c5ef84dc06ef7948ec))
* statisfy linter ([2e2d3cb](https://github.com/KvngMikey/cashu-ts/commit/2e2d3cb4a5aab7e19e3142078e0454331d185b2d))
* update melt quote handling to use MeltMethodOptions for amountless support ([3ee90fd](https://github.com/KvngMikey/cashu-ts/commit/3ee90fdc0dd0dd4b7836bf83b3335da0ba7d6ed1))
* update melt quote handling to use MeltMethodOptions for amountless support ([9f47c9a](https://github.com/KvngMikey/cashu-ts/commit/9f47c9ade6971c2a740a0959581a34af75556de7))
* use string matching for protected endpoint patterns ([9a893e4](https://github.com/KvngMikey/cashu-ts/commit/9a893e43c0420058d4b69c317e02e89d625da07c))
* use string matching for protected endpoint patterns ([14b422a](https://github.com/KvngMikey/cashu-ts/commit/14b422a5268dcbbb782019da5a6e35d82f42a057))
* validate proof amounts in token decoding ([ad058a6](https://github.com/KvngMikey/cashu-ts/commit/ad058a61262197d6b3bbb49eda6bb6dcfe7b3d1c))
* validate proof amounts in token decoding ([83635e3](https://github.com/KvngMikey/cashu-ts/commit/83635e33e8101c58c2268ac7f41814bbb813082a))
* validate swap signature count before constructing proofs ([b6ac697](https://github.com/KvngMikey/cashu-ts/commit/b6ac697f79d70f9959e65830540994c5cc320412))
* validate swap signature count before constructing proofs ([72e0b11](https://github.com/KvngMikey/cashu-ts/commit/72e0b115d3e0898e2de6e43483ba8a12813ea5e4))
* **wallet:** allow custom OutputType in prepareMelt without modification ([8c4edf5](https://github.com/KvngMikey/cashu-ts/commit/8c4edf527609fb1132d335df521870339d4e2664))

## [3.4.0](https://github.com/cashubtc/cashu-ts/compare/v3.3.0...v3.4.0) (2026-02-05)

### Features

- add new glob prefix wildcard match for nut-21/22 ([77c544a](https://github.com/cashubtc/cashu-ts/commit/77c544a411b166612fd4797f07836141404607e9))
- **ci:** add release automation and husky ([6bf4492](https://github.com/cashubtc/cashu-ts/commit/6bf44923188defbef2b3a7b98f68fb16d940a6f6))

### Bug Fixes

- **ci:** add missing permission ([05182da](https://github.com/cashubtc/cashu-ts/commit/05182da1807cedea3eab69773eb6f132c5813fe4))
  ts/commit/950ae5495273cea30578a84d67934a42eb140f0d))
- standalone asset build in CI ([2cc1138](https://github.com/cashubtc/cashu-ts/commit/2cc1138bc195edd4566e69c5ef84dc06ef7948ec))
