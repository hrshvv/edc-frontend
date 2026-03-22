import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(
                    buttonVariants({ variant, size }),
                    "transition-all duration-300 hover:scale-105",
                    neon && "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]",
                    className
                )}
                ref={ref}
                {...props}
            >
                {neon && (
                    <>
                        <span className="absolute h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-400 to-transparent" />
                        <span className="absolute h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 bottom-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-400 to-transparent" />
                        <span className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                    </>
                )}
                {children}
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };