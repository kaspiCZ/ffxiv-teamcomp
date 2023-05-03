"use strict"
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.onmessage = () => {
  self.postMessage("someResult")
}
