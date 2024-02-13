export interface ClosePipelineStatus {
  id: string;
  label: string;
  type: "active" | "won" | "lost";
}

export interface CloseOpportunityStatus extends ClosePipelineStatus {
  pipeline_id: string;
  organization_id: string;
}

export interface ClosePipeline {
  created_by: string | null;
  date_created: string;
  date_updated: string;
  id: string;
  name: string;
  organization_id: string;
  statuses: ClosePipelineStatus[];
  updated_by: string | null;
}

export interface CloseOpportunity {
  id: string;
  organization_id: string;
  lead_id: string;
  lead_name: string;
  date_won: string | null;
  confidence: number;
  value: number;
  value_period: string;
  value_formatted: string;
  value_currency: string;
  expected_value: number;
  annualized_value: number;
  annualized_expected_value: number;
  note: string;
  status_id: string;
  status_label: string;
  status_type: string;
  contact_id: string | null;
  user_id: string;
  user_name: string;
  created_by: string | null;
  updated_by: string | null;
  date_created: string;
  date_updated: string;
}

export const close = async (
  resource: "pipelines" | "statuses" | "opportunities",
) => {
  if (!resource) {
    return false;
  }

  const base = process.env.CLOSE_API_BASE;

  let url;

  switch (resource) {
    case "pipelines":
      url = `${base}/pipeline`;

      break;

    case "statuses":
      url = `${base}/status/opportunity`;

      break;

    case "opportunities":
      url = `${base}/opportunity`;

      break;
  }

  let json;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(process.env.CLOSE_API_KEY as string)}`,
      },
    });

    json = await response.json();
  } catch (e) {
    console.error(e);
  }

  return json;
};
