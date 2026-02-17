

import { useSpring, useTransform } from "framer-motion";



export const Parallax = (scrollY) => {
    const y = useTransform(scrollY, [100, 500], [1.8, 0.8]);
    const t = useTransform(scrollY, [100, 500], [-156, 0]);
    const c = useTransform(scrollY, [100, 500], [-4, 0]);
    const r = useTransform(scrollY, [100, 500], [43, 0]);
    const rz = useTransform(scrollY, [100, 500], [0.2, 0]);
    const ry = useTransform(scrollY, [100, 500], [0, 0]);
    const scale = useSpring(y, {
      duration: 3,
    });
    return { y, t, c, r, rz, ry , scale};
}