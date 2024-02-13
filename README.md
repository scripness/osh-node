## About

The following API includes two endpoints forwarding responses from Close.com's API in a typed and tested manner.

## Preparation

### Install the dependencies

```shell
npm install
```

### Configure the environment

```bash
cp .env.example env
```

Complete the `.env` document with missing secrets.

## Running

- Run in development mode with auto-reload: `npm run dev`
- Compile production build from `TypeScript`: `npm run build`
- Run production build: `npm start`
- Run the test suite: `npm test`

## Usage

### Get a list of Pipelines

```
GET /api/pipelines

[
  {
    created_by: string | null,
    date_created: string,
    date_updated: string,
    id: string,
    name: string,
    organization_id: string,
    statuses: [
      {
        id: string,
        label: string,
        type: 'active' | 'won' | 'lost',
      }
    ],
    updated_by: string | null
  }
]
```

### Get a list of Opportunities associated with a given Pipeline

```
GET /api/pipelines/{pipelineId}/opportunities

[
  {
    status_label: string,
    lead_id: string,
    status_display_name: string,
    confidence: number,
    expected_value: number,
    updated_by_name: string,
    annualized_expected_value: number,
    status_id: string,
    annualized_value: number,
    date_lost: string | null,
    value_period: string,
    created_by: string,
    date_won: string,
    lead_name: string,
    contact_name: string | null,
    user_name: string,
    created_by_name: string,
    updated_by: string,
    date_updated: string,
    date_created: string,
    id: string,
    value_currency: string,
    note: string,
    user_id: string,
    contact_id: string | null,
    integration_links: [],
    status_type: string,
    value_formatted: string,
    value: number,
    organization_id: string,
  }
]
```
