import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { blogPosts } from "../../data/blogData";

const BlogPostDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-mono text-sm text-[#404040]">
        ARTICLE_NOT_FOUND // 404_OVERHEAD
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] min-h-screen antialiased text-[#0a0a0a] font-sans text-left">
      <div className="max-w-[700px] mx-auto px-6 pt-36 pb-6">
        <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-medium text-[#404040] hover:text-[#0a0a0a] transition-colors mb-8 font-mono bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-1 rounded-md">
          <ChevronLeft className="w-3.5 h-3.5" /> BACK_TO_FEED
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs text-[#404040]">
            <span className="font-semibold text-[#3b82f6] bg-[#3b82f6]/5 px-2 py-0.5 rounded border border-[#3b82f6]/10 uppercase">{post.tag}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight pt-1">
            {post.title}
          </h1>
        </motion.div>
      </div>

      <section className="pb-24 pt-6 bg-[#ffffff]">
        <div className="max-w-[700px] mx-auto px-6">
          <div 
            className="prose prose-neutral max-w-none text-[#171717] space-y-6 text-sm sm:text-base leading-relaxed font-normal
              prose-headings:font-['Satoshi',sans-serif] prose-headings:font-medium prose-headings:text-[#0a0a0a] prose-headings:tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </section>
    </div>
  );
};

export default BlogPostDetail;