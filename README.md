# Project Name

This project is built with [NestJS](https://nestjs.com/) framework.

## Installation

To install the necessary dependencies for the project, run the following command:

```bash
npm ci
```

Alternatively, you can also use:

```bash
npm i
```

# Email Parser Service

This service allows you to parse an email file using a specified file path.

## Endpoints

### `GET /email-parser/parse`

Parses an email file based on the provided file path.

#### Query Parameters:

- `filePath` (string, required): The path to the email file that you wish to parse.

#### Response:

- A JSON object with the result of the parsing operation. The response structure depends on the implementation of the `parseEmail` method in the `EmailParserService`.

#### Example Request:

```bash
GET /email-parser/parse?filePath=/path/to/email/file.eml
```

Example Response:

```json
{
  "status": "success",
  "data": {
    "subject": "Subject of the email",
    "sender": "sender@example.com",
    "content": "Email body content"
  }
}
```

# Transform Service

This service processes and transforms email records, providing a detailed output about the message's status.

## Endpoints

### `POST /transform`

Transforms the input data and returns an output with various flags related to the email's status.

#### Request Body:

The request should include an object in the following format:

```json
{
  "Records": [
    {
      "eventVersion": "string",
      "ses": {
        "receipt": {
          "timestamp": "string",
          "processingTimeMillis": 0,
          "recipients": ["string"],
          "spamVerdict": { "status": "string" },
          "virusVerdict": { "status": "string" },
          "spfVerdict": { "status": "string" },
          "dkimVerdict": { "status": "string" },
          "dmarcVerdict": { "status": "string" },
          "dmarcPolicy": "string",
          "action": { "type": "string", "topicArn": "string" }
        },
        "mail": {
          "timestamp": "string",
          "source": "string",
          "messageId": "string",
          "destination": ["string"],
          "headersTruncated": true,
          "headers": [{ "name": "string", "value": "string" }],
          "commonHeaders": {
            "returnPath": "string",
            "from": ["string"],
            "date": "string",
            "to": ["string"],
            "messageId": "string",
            "subject": "string"
          }
        }
      },
      "eventSource": "string"
    }
  ]
}
```

The response will be a JSON object that follows the OutputDTO format:

```json
{
  "spam": true,
  "virus": true,
  "dns": true,
  "mes": "Message text",
  "retrasado": false,
  "emisor": "sender@example.com",
  "receptor": ["recipient@example.com"]
}
```
