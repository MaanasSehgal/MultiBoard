import React from "react";

function Hero() {
    return (
        <section className="bg-black">
            <div className="flex items-baseline justify-center pt-20">
                <h2 className="text-white border border-white text-center px-3 p-2 rounded-full">See What's New | <span className="text-sky-300">AI Diagram</span></h2>
            </div>
            <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:h-screen">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-5xl">
                        Documents & diagrams
                        <span className="sm:block"> for engineering teams.</span>
                    </h1>

                    <p className="text-slate-200 mx-auto mt-4 max-w-xl sm:text-xl">All-in-one markdown editor, collaborative canvas and diagram-as-code builder</p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block rounded border border-blue-600 bg-white text-black px-12 py-3 text-sm font-medium  hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 text-center"
                            href="#">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
