export type CampaignContent = {
  eyebrow: string;
  heading: string;
  body: string;
};

export const defaultCampaign: CampaignContent = {
  eyebrow: "Our campaign",
  heading: "A community campaign to build the school our students deserve.",
  body: "Our Pollard Now campaign is to support passage of the debt exclusion override in Needham to build a new Pollard middle school for grades 6–8. We are working hard to inform Needham residents about the benefits to all of the new build and welcome your help and support.",
};

export const CAMPAIGN_STORAGE_KEY = "pollardnow:campaign:v1";
