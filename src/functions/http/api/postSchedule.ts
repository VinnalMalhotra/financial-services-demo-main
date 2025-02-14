import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const postSchedule = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { queryParams } = request;

  const api_key = YEXT_PUBLIC_HEARSAY_XAPIKEY as string;

  const { body } = queryParams;

  const getPostResponse = await fetch(
    `https://api.hearsaysocial.com/v1/org/874/groups/1146181/messages/2287696/`,
    {
      headers: {
        accept: "application/json",
        "X-Auth-Token": api_key,
        "content-type": "application/json",
      },
      method: "POST",
      body: body,
    }
  );

  const resp = await getPostResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default postSchedule;
