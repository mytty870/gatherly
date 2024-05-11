export const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'Next UI を Next.js プロジェクト内で利用してみた。',
    },
    {
      id: 2,
      title: 'Next UI を Next.js プロジェクト内で利用してみた。',
    },
    {
      id: 3,
      title: 'Next UI を Next.js プロジェクト内で利用してみた。',
    },
  ]

  return (
    <>
      {/* <article
    className="w-[70vw] max-w-[440px] md:w-[330px] bg-white border border-[#d6e3ed] hover:bg-[#f5fbff] rounded-lg text-wrap min-h-[150px] p-6 shadow-md cursor-pointer "
  >
    <div className="flex">
    <h2 className="break-all line-clamp-3 font-medium text-xl">
      Next UI を Next.js プロジェクト内で利用してみた。
    </h2>
    </div>
  </article>
  <article
    className="w-[70vw] max-w-[440px] md:w-[330px] bg-white border border-[#d6e3ed] hover:bg-[#f5fbff] rounded-lg text-wrap min-h-[150px] p-6 shadow-md cursor-pointer "
  >
    <div className="flex">
    <h2 className="break-all line-clamp-3 font-medium text-xl">
      Next UI を Next.js プロジェクト内で利用してみた。
    </h2>
    </div>
  </article>
  <article
    className="w-[70vw] max-w-[440px] md:w-[330px] bg-white border border-[#d6e3ed] hover:bg-[#f5fbff] rounded-lg text-wrap min-h-[150px] p-6 shadow-md cursor-pointer "
  >
    <div className="flex">
    <h2 className="break-all line-clamp-3 font-medium text-xl">
      Next UI を Next.js プロジェクト内で利用してみた。
    </h2>
    </div>
  </article> */}
      {articles.map(article => {
        ;<article
          className="min-h-[150px] w-[70vw] max-w-[440px] cursor-pointer text-wrap rounded-lg border border-[#d6e3ed] bg-white p-6 shadow-md hover:bg-[#f5fbff] md:w-[330px] "
          key={article.id}
        >
          <div className="flex">
            <h2 className="line-clamp-3 break-all text-xl font-medium">
              Next UI を Next.js プロジェクト内で利用してみた。
            </h2>
          </div>
        </article>
      })}
      <div>aa</div>
    </>
  )
}
