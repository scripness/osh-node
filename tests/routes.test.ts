import request from "supertest";

import "jest-extended";

import { app } from "../src/app";

describe("GET /api/pipelines", () => {
  it("responds with a list of pipelines", async () => {
    const { body: pipelines } = await request(app)
      .get("/api/pipelines")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(pipelines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          created_by: expect.toBeOneOf([expect.any(String), null]),
          date_created: expect.any(String),
          date_updated: expect.any(String),
          id: expect.any(String),
          name: expect.any(String),
          organization_id: expect.any(String),
          statuses: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              label: expect.any(String),
              type: expect.any(String),
            }),
          ]),
          updated_by: expect.toBeOneOf([expect.any(String), null]),
        }),
      ]),
    );
  });

  it("responds with a list of opportunities for a pipeline", async () => {
    const { body: pipelines } = await request(app)
      .get(`/api/pipelines`)
      .expect(200);

    const pipelineID = pipelines[0].id;

    const { body: opportunities } = await request(app)
      .get(`/api/pipelines/${pipelineID}/opportunities`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(opportunities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status_label: expect.any(String),
          lead_id: expect.any(String),
          status_display_name: expect.any(String),
          confidence: expect.any(Number),
          expected_value: expect.any(Number),
          updated_by_name: expect.any(String),
          annualized_expected_value: expect.any(Number),
          status_id: expect.any(String),
          annualized_value: expect.any(Number),
          date_lost: expect.toBeOneOf([expect.any(String), null]),
          value_period: expect.any(String),
          created_by: expect.any(String),
          date_won: expect.any(String),
          lead_name: expect.any(String),
          contact_name: expect.toBeOneOf([expect.any(String), null]),
          user_name: expect.any(String),
          created_by_name: expect.any(String),
          updated_by: expect.any(String),
          date_updated: expect.any(String),
          date_created: expect.any(String),
          id: expect.any(String),
          value_currency: expect.any(String),
          note: expect.any(String),
          user_id: expect.any(String),
          contact_id: expect.toBeOneOf([expect.any(String), null]),
          integration_links: expect.arrayContaining([]),
          status_type: expect.any(String),
          value_formatted: expect.any(String),
          value: expect.any(Number),
          organization_id: expect.any(String),
        }),
      ]),
    );
  });
});
