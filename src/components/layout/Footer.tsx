import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12">
            <div className="max-w-8xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black tracking-tighter">AOP</span>
                        </div>
                        <p className="text-gray-400 text-[18px] leading-relaxed max-w-md font-medium">
                            한양대학교 ERICA SW창업캡스톤디자인 통합 플랫폼. <br />
                            All-in-One Platform for Campus Entrepreneurs.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[12px] font-black text-primary tracking-[0.2em] uppercase mb-8">Services</h3>
                        <ul className="space-y-4 text-[16px] font-bold text-gray-500">
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">LMS Dashboard</Link></li>
                            <li><Link href="/community" className="hover:text-white transition-colors">Team Matching</Link></li>
                            <li><Link href="/proposals" className="hover:text-white transition-colors">Opportunities</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[12px] font-black text-primary tracking-[0.2em] uppercase mb-8">Support</h3>
                        <ul className="space-y-4 text-[16px] font-bold text-gray-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Service Guide</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">System Status</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest">
                        © 2024 Hanyang University ERICA. All rights reserved.
                    </p>
                    <div className="flex items-center gap-10 text-[12px] font-bold text-gray-600 uppercase tracking-widest">
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
