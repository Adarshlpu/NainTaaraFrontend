import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for SPA navigation tracking
import { blogPosts } from "../../data/blogData"; // Hooks absolute data array directly

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-[#ffffff] min-h-screen antialiased text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      {/* ==================== HERO HEADER ==================== */}
      <section className="pt-36 pb-16 bg-[#ffffff] border-b border-[#e5e5e5] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3 py-0.5 rounded-full text-xs font-medium font-mono select-none">
              INSIGHTS // CLINICAL_WELLNESS
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
              Nainocular Blog
            </h1>
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed max-w-2xl">
              Explore professional insights, technical analysis, and articles about eye health tracking, AI-powered vision therapy software, and pediatric habit development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== BLOG POSTS FEED ==================== */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, index) => (
              /* 💡 FIXED: Replaced motion.article directly inside dynamic parameter path mapping strings */
              <Link 
                key={index} 
                to={`/blog/${post.slug}`} 
                className="block group no-underline"
              >
                <motion.article
                  variants={itemVariants}
                  className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 flex flex-col justify-between h-72 hover:border-[#d4d4d4] transition-all h-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="space-y-4">
                    {/* Top Meta Details Component */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-[#3b82f6] bg-[#3b82f6]/5 px-2 py-0.5 rounded border border-[#3b82f6]/10 uppercase">
                        {post.tag}
                      </span>
                      <span className="text-xs text-[#404040] font-medium font-mono">
                        {post.label} // {post.readTime}
                      </span>
                    </div>

                    {/* Headline & Abstract Info */}
                    <div className="space-y-2 text-left">
                      <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight line-clamp-2 leading-snug font-['Satoshi',sans-serif] group-hover:text-[#3b82f6] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[#404040] text-xs sm:text-sm font-normal line-clamp-3 leading-relaxed">
                        {post.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Timeline Footer row */}
                  <div className="pt-4 border-t border-[#f5f5f5] flex items-center justify-between text-xs text-[#404040] select-none font-medium mt-4">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1 text-[#0a0a0a] font-semibold">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Blog;