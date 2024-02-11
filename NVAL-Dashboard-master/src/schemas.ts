import * as yup from 'yup';

export const infrastructureNodeSchema = yup
  .object()
  .shape({
    hostName: yup.string().required(),
    hostAddress: yup.string().required(),
    id: yup.string().required().min(3, ">= 3 letters").max(128, "<= 128 letters"),
  })
  .required();

export const networkSchema = yup.object().shape({
    id: yup.string().required().min(3, ">= 3 letters").max(128, "<= 128 letters"),
    name: yup.string().required().min(6, ">= 6 letters"),
    nodes: yup.array().required().of(infrastructureNodeSchema).min(1, "should have more than 1")
  })
  