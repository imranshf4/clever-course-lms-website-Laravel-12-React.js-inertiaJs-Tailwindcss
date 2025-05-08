const Search = ({ heading, subheading }: any) => {
    return (
        <div style={{ backgroundImage: `url(${'frontend/assets/home/search/search-bg.jpg'})` }}>
            <div  className="section-container">
                <div className="space-y-4 text-center text-white">
                    <h1 className="text-3xl font-bold uppercase">{heading}</h1>
                    <div className="flex justify-center">
                        <hr className="w-10" />
                    </div>
                    <p className="text-md text-white/60">{subheading}</p>
                </div>

                <span className="mt-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
                    <select className="w-full border bg-white px-4 py-3 focus:outline-none sm:w-auto sm:px-5 sm:py-3.5">
                        <option value="">Category</option>
                        <option value="app">App</option>
                        <option value="cook">Cook</option>
                        <option value="illustration">illustration</option>
                        <option value="improving">Improving</option>
                        <option value="motivate">Motivate</option>
                        <option value="online-course">Online Course</option>
                        <option value="onsite-course">Onsite Course</option>
                        <option value="photography">Photography</option>
                        <option value="social-media">Social Media</option>
                        <option value="speaking">Speaking</option>
                        <option value="start-up">Start Up</option>
                        <option value="website">Website</option>{' '}
                    </select>

                    <input type="text" className="w-full border bg-white px-4 py-3.5 focus:outline-none sm:px-5 md:w-2/8" placeholder="keywords" />

                    <button className="bg-buyBtn hover:bg-buyBtn/90 w-full cursor-pointer border-b-2 border-[#65b4ad] px-4 py-3 text-white capitalize transition-colors sm:w-auto sm:px-8">
                        search
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Search;
