import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image: string;
  date: string;
  read_time: string;
  published: number;
}

interface Widget {
  id: number;
  title: string;
  image: string;
  link: string;
  position: number;
}

const fallbackBlogs: BlogPost[] = [
  { id: 1, title: "How to Crack IIT Madras Qualifier Exam in First Attempt", slug: "how-to-crack-iit-madras-qualifier", category: "Exam Prep", content: "", image: "https://picsum.photos/seed/blog1/600/400", date: "Oct 12, 2024", read_time: "5 min read", published: 1 },
  { id: 2, title: "Top 5 Programming Languages to Learn in 2025", slug: "top-5-programming-languages-2025", category: "Career", content: "", image: "https://picsum.photos/seed/blog2/600/400", date: "Oct 15, 2024", read_time: "5 min read", published: 1 },
  { id: 3, title: "Balancing Online Degree with a Full-Time Job", slug: "balancing-online-degree-full-time-job", category: "Productivity", content: "", image: "https://picsum.photos/seed/blog3/600/400", date: "Oct 18, 2024", read_time: "5 min read", published: 1 },
  { id: 4, title: "Understanding Data Structures and Algorithms", slug: "understanding-dsa", category: "Computer Science", content: "", image: "https://picsum.photos/seed/blog4/600/400", date: "Oct 20, 2024", read_time: "5 min read", published: 1 },
  { id: 5, title: "Why Open Source Contributions Matter", slug: "why-open-source-contributions-matter", category: "Career", content: "", image: "https://picsum.photos/seed/blog5/600/400", date: "Oct 22, 2024", read_time: "5 min read", published: 1 },
  { id: 6, title: "Mastering Python for Data Science", slug: "mastering-python-data-science", category: "Programming", content: "", image: "https://picsum.photos/seed/blog6/600/400", date: "Oct 25, 2024", read_time: "5 min read", published: 1 },
];

function WidgetCard({ widget }: { widget: Widget }) {
  return (
    <a
      href={widget.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden border-[3px] border-[#0b1120] shadow-[6px_6px_0px_#0b1120] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_#0b1120] transition-all group"
    >
      <div className="relative">
        <img
          src={widget.image}
          alt={widget.title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ minHeight: '180px' }}
        />
        {widget.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-bold text-sm leading-tight">{widget.title}</p>
          </div>
        )}
      </div>
    </a>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug || post.id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/2] rounded-3xl overflow-hidden border-[3px] border-[#0b1120] mb-4 shadow-[6px_6px_0px_#0b1120] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[10px_10px_0px_#0b1120] transition-all">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 px-4 py-1.5 bg-white text-[#0b1120] font-bold text-sm rounded-full border-2 border-[#0b1120]">
          {post.category}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-2">
        <span>{post.date}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        <span>{post.read_time}</span>
      </div>
      <h3 className="text-xl font-black text-[#0b1120] leading-tight group-hover:text-[#10b981] transition-colors">
        {post.title}
      </h3>
    </Link>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/blogs')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setBlogs(data); })
      .catch(() => { });

    fetch('http://localhost:3001/api/widgets')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setWidgets(data); })
      .catch(() => { });
  }, []);

  // Split widgets: first widget goes before blogs (on mobile), rest go after
  const widget1 = widgets[0] || null;
  const widget2 = widgets[1] || null;
  const widget3 = widgets[2] || null;

  return (
    <div className="min-h-screen bg-white text-[#0b1120] font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-[#0b1120] mb-6">Our Blog</h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Insights, tips, and strategies to help you excel in your online degree program.
          </p>
        </div>

        {/* Desktop: Blog grid + sticky sidebar | Mobile: widgets interspersed */}
        <div className="flex gap-8 items-start">

          {/* Main blog content */}
          <div className="flex-1 min-w-0">
            {/* Mobile only: Widget 1 before blogs */}
            {widget1 && (
              <div className="lg:hidden mb-8">
                <WidgetCard widget={widget1} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Mobile only: Widgets 2 & 3 after blogs */}
            {(widget2 || widget3) && (
              <div className="lg:hidden mt-10 space-y-6">
                {widget2 && <WidgetCard widget={widget2} />}
                {widget3 && <WidgetCard widget={widget3} />}
              </div>
            )}
          </div>

          {/* Desktop sidebar - sticky */}
          <aside className="hidden lg:block w-[320px] shrink-0 sticky top-24">
            <div className="space-y-6">
              {widgets.length > 0 ? (
                widgets.map((w) => <WidgetCard key={w.id} widget={w} />)
              ) : (
                <div className="p-6 bg-gray-50 border-[3px] border-dashed border-gray-200 rounded-2xl text-center">
                  <p className="text-gray-400 font-bold text-sm">Widget space</p>
                  <p className="text-gray-400 text-xs mt-1">Add widgets from admin panel</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
