import Link from "next/link";

interface Author {
    name: string;
    about: string;
    image: { asset: { url: string } };
}

interface Blog {
    _id: string;
    title: string;
    content: any[];
    createdAt: string;
    blogimage: { asset: { url: string } };
    author: Author | null;
}

interface BlogsProps {
    blogs: Blog[];
}

export default function Blogs({ blogs }: BlogsProps) {
    return (
        <div className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Latest Blogs</h2>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Blog Image */}
                            <Link href={`/blogs/${blog._id}`}>
                                <img
                                    src={blog.blogimage?.asset?.url || '/default-image.jpg'} // Fallback image
                                    alt={blog.title}
                                    className="w-full h-56 object-cover"
                                />
                            </Link>

                            <div className="p-6 flex flex-col justify-between flex-grow">
                                {/* Title and Date */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        <Link href={`/blogs/${blog._id}`}>
                                            {blog.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Author Details */}
                                {blog.author && (
                                    <div className="mt-5 flex items-center">
                                        <img
                                            src={blog.author.image.asset.url || '/default-author.jpg'} // Fallback image
                                            alt={blog.author.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">{blog.author.name}</p>
                                            <p className="text-sm text-gray-600">{blog.author.about}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}