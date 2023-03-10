import { useEffect, useRef, useState } from "react"

const useGetVisibility = (options) => {
    const [visible, changeVisible] = useState(false);
    const ref = useRef(null);

    const callBack = (entries) => {
        const [entry] = entries;
        changeVisible(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callBack, options);
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [ref, options]);

    return [visible, ref];
}

export default useGetVisibility;