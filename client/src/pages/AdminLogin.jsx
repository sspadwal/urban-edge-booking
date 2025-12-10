import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 flex flex-col items-center"
            >
                <div className="mb-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-xl">
                        <ShieldCheck className="w-8 h-8 text-amber-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight text-center">
                        Admin <span className="text-amber-500">Access</span>
                    </h1>
                    <p className="text-neutral-400 mt-2 text-center">
                        Authorized personnel only.
                    </p>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "bg-neutral-900 border border-white/10 shadow-xl w-full",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            formButtonPrimary: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-900 font-bold border-none",
                            formFieldLabel: "text-neutral-300",
                            formFieldInput: "bg-neutral-800 border-white/10 text-white focus:border-amber-500",
                            footer: "hidden",
                        }
                    }}
                    redirectUrl="/admin"
                />
            </motion.div>
        </div>
    );
};

export default AdminLogin;
