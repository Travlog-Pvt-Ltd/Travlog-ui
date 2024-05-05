'use client';

import { Suspense } from "react";
import CreateContainer from "@containers/Create/CreateContainer";

export default function Create() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateContainer />
    </Suspense>
  )
}