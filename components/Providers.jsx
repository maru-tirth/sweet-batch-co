"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { CircleCheck, Info } from "lucide-react";
import InstagramHandoff from "@/components/InstagramHandoff";
import { copyText } from "@/lib/orders";

const ToastContext = createContext({ notify: () => {}, startInstagramOrder: () => {} });
export const useToast = () => useContext(ToastContext);

export default function Providers({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const notify = useCallback((message, tone = "success") => {
    const id = ++idRef.current;
    setToasts((t) => [...t.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const [igOrder, setIgOrder] = useState(null); // { message, copied }

  /** Copy first (while the page has focus), then show paste instructions. */
  const startInstagramOrder = useCallback(async (message) => {
    const copied = await copyText(message);
    setIgOrder({ message, copied, key: Date.now() });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ToastContext.Provider value={{ notify, startInstagramOrder }}>
        {children}
        <AnimatePresence>
          {igOrder && <InstagramHandoff key={igOrder.key} message={igOrder.message} copied={igOrder.copied} onClose={() => setIgOrder(null)} />}
        </AnimatePresence>
        <div
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex flex-col items-center gap-2 px-4"
        >
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="flex max-w-md items-start gap-2.5 rounded-2xl bg-deep px-4 py-3 text-sm text-offwhite shadow-lift"
              >
                {t.tone === "info" ? (
                  <Info className="mt-0.5 size-4 shrink-0 text-caramel" />
                ) : (
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-caramel" />
                )}
                <span>{t.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ToastContext.Provider>
    </MotionConfig>
  );
}
