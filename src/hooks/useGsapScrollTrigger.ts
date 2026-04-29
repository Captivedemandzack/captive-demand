"use client";

import { useLayoutEffect, type DependencyList } from "react";
import gsap from "gsap";

type GsapScope = Parameters<typeof gsap.context>[1];

export function useGsapScrollTrigger(
    setup: () => void,
    deps: DependencyList,
    scope?: GsapScope
) {
    useLayoutEffect(() => {
        let cancelled = false;
        let ctx: gsap.Context | undefined;

        void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            ctx = gsap.context(setup, scope);
        });

        return () => {
            cancelled = true;
            ctx?.revert();
        };
        // The caller controls dependency stability, mirroring useLayoutEffect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
