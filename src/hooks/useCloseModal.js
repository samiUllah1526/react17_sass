import { useEffect, useRef } from "react";

export const useCloseModal = (handleClose) => {
    const ref = useRef(null)

    useEffect(() => {
        const closeOnEscapeKey = e => {
            e.key === "Escape" ? handleClose() : null;
        }

        const closeOnClickOutside = (e) => {
            e.preventDefault()
            if (ref.current && !ref.current.contains(e.target)) {
                handleClose()
            }
        }

        document.body.addEventListener("keydown", closeOnEscapeKey);
        document.body.addEventListener("click", closeOnClickOutside, true);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            document.body.removeEventListener("click", closeOnClickOutside);

        };
    }, []);


    return ref
}
