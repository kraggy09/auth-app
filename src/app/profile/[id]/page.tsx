import React from "react";

type Params = {
  params: { id: string };
};

export default function ProfileIndividualPage({ params }: Params) {
  console.log(params);

  return <div>Individual Profile {params.id}</div>;
}
