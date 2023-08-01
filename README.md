# TxMS E-mail Observer

Use our e-mail listener service to send Core Blockchain transactions.

E-mail address: `stream@datalayer.host`

## Message Composition

- The subject line should reflect the network name. Here are your options:
  - For Core Mainnet: `mainnet`, `main`, or `1`
  - For Core Devin: `testnet`, `test`, `devin`, or `3`
- The body of the email should contain the TxMS transaction.
  - Each new transaction should start on a new line
  - Refrain from including extra text or signatures
  - Only raw text is acceptable, not HTML

## Technical Details

At present, the [Blockbook](https://github.com/trezor/blockbook) streamer is supported.

You need to specify the streamer URLs for `mainnet` and `testnet` directly in the code.

By setting `debug` to true, you can enable debug information.

## Service Providers

Tested service providers include:
- [pipedream.com](https://pipedream.com)

## Motto

> 「Cryptoni Confidimus」

## License

This service is licensed under the [CORE](LICENSE) License.
