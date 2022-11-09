# E-mail TXMS Observer

Receive TXMS as emails.

E-mail: `stream@datalayer.host`

## Composing message

- Subject is the network name.
  - `mainnet` Core Mainnet
  - `main` Core Mainnet
  - `1` Core Mainnet
  - `testnet` Core Devin
  - `test` Core Devin
  - `devin` Core Devin
  - `3` Core Devin
- Body is the TXMS transaction.
  - Each line is new message
  - Don't use extra text or signature
  - Raw text is used, no html

## Code

Currently [Blockbook](https://github.com/cryptohub-digital/blockbook) streamer is supported.

You should set URL of streamer for `mainnet` and `testnet` directly in the code.

You can enable debug information with set `debug` to true.

## Providers

Tested providers:
- [pipedream.com](https://pipedream.com)

## Epigram

> 「Cryptoni Confidimus」

## License

Licensed under the [CORE](LICENSE) License.
