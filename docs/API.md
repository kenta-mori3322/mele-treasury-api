## Address

**GET** /address/**:address**

Fetch account info by address.

### Parameters

-   `address` **[string]** Account address

Returns **[Array]<Coin>** coins - All account token balances.

## Burn

**POST** /burn

Burn tokens.

### Parameters

-   `amountMelc` **[number]** Amount of MELC tokens to burn
-   `amountMelg` **[number]** Amount of MELG tokens to burn

Returns **string** transactionHash - Hash of the burn transaction.

## Disburse

**POST** /disburse

Disburse tokens.

### Parameters

-   `amountMelc` **[number]** Amount of MELC tokens to disburse
-   `amountMelg` **[number]** Amount of MELG tokens to disburse
-   `reference_id` **[string]** Reference id
-   `address` **[string]** Address to disburse the tokens to

Returns **string** transactionHash - Hash of the disburse transaction.

## Info

**GET** /info

Fetch current treasury service information

Returns **Info** info - Total disbursed and burned info.

## Status

**GET** /status/:txHash

Fetch the status of disbursement by transaction hash.

### Parameters

-   `amount` **[number]** Amount of tokens to disburse

Returns **Status** status - Disbursement status.
