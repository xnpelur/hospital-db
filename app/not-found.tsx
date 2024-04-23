export default function NotFoundPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center text-center">
            <div>
                <h1 className="m-0 mr-5 inline-block border-r border-black/30 p-0 pr-6 align-top text-3xl font-medium leading-[49px]">
                    404
                </h1>
                <div className="inline-block">
                    <h2 className="text-md m-0 font-normal leading-[49px]">
                        Страница не найдена.
                    </h2>
                </div>
            </div>
        </div>
    );
}
