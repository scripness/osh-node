import express, { Request, Response } from "express";

import {
  close,
  CloseOpportunity,
  CloseOpportunityStatus,
  ClosePipeline,
} from "./services/close";

export const router = express.Router();

router
  .get("/pipelines", async (req: Request, res: Response) => {
    const pipelines = (await close("pipelines")) as {
      data: ClosePipeline[];
    };

    if (!pipelines || !pipelines.data.length) {
      return res.status(404).json("Could not find any pipelines.");
    }

    return res.status(200).json(pipelines.data);
  })
  .get(
    "/pipelines/:pipelineId/opportunities",
    async (req: Request, res: Response) => {
      const statuses = (await close("statuses")) as {
        data: CloseOpportunityStatus[];
      };

      if (!statuses || !statuses.data.length) {
        return res.status(404).json("Could not find any statuses.");
      }

      const statusesByPipeline = statuses.data.filter(
        (status) => status.pipeline_id === req.params.pipelineId,
      );

      if (!statusesByPipeline || !statusesByPipeline.length) {
        return res
          .status(404)
          .json(
            "Could not find any statuses associated with the requested pipeline.",
          );
      }

      const opportunities = (await close("opportunities")) as {
        data: CloseOpportunity[];
      };

      if (!opportunities || !opportunities.data.length) {
        return res.status(404).json("Could not find any opportunities.");
      }

      const opportunitiesByPipeline = opportunities.data.filter((opportunity) =>
        statusesByPipeline
          .map((statusByPipeline) => statusByPipeline.id)
          .includes(opportunity.status_id),
      );

      if (!opportunitiesByPipeline || !opportunitiesByPipeline.length) {
        return res
          .status(404)
          .json(
            "Could not find any opportunities associated with the requested pipeline.",
          );
      }

      return res.status(200).json(opportunitiesByPipeline);
    },
  );
