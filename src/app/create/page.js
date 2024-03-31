'use client';

import { Suspense } from "react";
import CreateContainer from "@/containers/Create/CreateContainer";
import RichEditor from "@/containers/Editor/Editor";

export default function Create() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <CreateContainer /> */}
      <RichEditor />
    </Suspense>
  )
}