export interface Translation{
  id:number;
  educational_degree_id:number;
  slug:string;
  name:string;
  abbreviation:string;
}
export interface EduDegrees{
  id:number;
  start_date:string;
  end_date:string|null;
  translations:Translation[]
}

export type TranslationRequestType={
    slug: string;
    name: string;
    abbreviation: string;
}

export type UpdateEducationPayload = {
  id: number;
  start_date: string;
  end_date: string|null
  translations: TranslationRequestType[];
};

export type AddEducationPayload = {
  start_date: string;
  end_date: string | null;
  translations: TranslationRequestType[];
};

export type EduFormValues = {
  name: string;
  abbreviation: string;
  startDate?: string | null;
  endDate?: string | null;
};