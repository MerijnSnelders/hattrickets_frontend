import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "form-input flex w-full min-w-0 p-3 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#244724] focus:border-none h-full placeholder:text-[#93c893] px-4 pl-2 text-base font-normal leading-normal",
        className
      )}
      {...props}
    />
  )
}

export { Input }
