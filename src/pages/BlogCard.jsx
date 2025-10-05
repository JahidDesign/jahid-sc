// File: BlogFeed.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Eye, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import VisitorCount from "./VisitorCount";

const reactionsList = [
  { emoji: "❤️", type: "love" },
  { emoji: "😂", type: "haha" },
  { emoji: "😮", type: "wow" },
  { emoji: "😢", type: "sad" },
  { emoji: "😡", type: "angry" },
];

const BlogFeed = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/blogpost");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        const blogsWithExtras = data.map((b) => ({
          ...b,
          comments: [],
          reactions: {},
          userReaction: null,
          showReactionPicker: false,
        }));
        setBlogs(blogsWithExtras);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ------------------- Poll comments -------------------
  useEffect(() => {
    const interval = setInterval(() => {
      blogs.forEach(async (blog) => {
        try {
          const res = await fetch(`http://localhost:3000/claims?blogId=${blog._id}`);
          if (!res.ok) return;
          const comments = await res.json();
          setBlogs((prev) =>
            prev.map((b) => (b._id === blog._id ? { ...b, comments } : b))
          );
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      });
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, [blogs]);

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Recent";

  const estimateReadTime = (content) => {
    if (!content) return "5 min read";
    const words = content.split(" ").length;
    return `${Math.ceil(words / 200)} min read`;
  };

  const handleComment = async (blogId, commentText) => {
    if (!commentText.trim()) return;

    // Optimistic update
    const tempComment = { id: Date.now(), text: commentText };
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId ? { ...b, comments: [...b.comments, tempComment] } : b
      )
    );

    try {
      const res = await fetch("http://localhost:3000/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, text: commentText }),
      });
      if (!res.ok) throw new Error("Failed to submit comment");
      const savedComment = await res.json();

      setBlogs((prev) =>
        prev.map((b) =>
          b._id === blogId
            ? {
                ...b,
                comments: b.comments.map((c) =>
                  c.id === tempComment.id ? savedComment : c
                ),
              }
            : b
        )
      );
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Failed to submit comment.");
    }
  };

  const handleReaction = (blogId, reactionType) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b._id !== blogId) return b;
        const prevReaction = b.userReaction;
        const newReactions = { ...b.reactions };
        if (prevReaction) newReactions[prevReaction] = (newReactions[prevReaction] || 1) - 1;
        newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
        return { ...b, reactions: newReactions, userReaction: reactionType, showReactionPicker: false };
      })
    );
  };

  const toggleReactionPicker = (blogId, value) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId ? { ...b, showReactionPicker: value } : b
      )
    );
  };

  const handleShare = (blogId) => {
    const blog = blogs.find((b) => b._id === blogId);
    alert(`Share this post: ${blog.title}`);
  };

  if (loading) return <p className="text-center mt-20 text-gray-600 text-lg font-semibold">Loading posts...</p>;
  if (error) return <p className="text-center mt-20 text-red-600 text-lg font-semibold">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">{blog.author}</p>
                  <p className="text-xs text-gray-500">{formatDate(blog.date)}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{blog.category}</span>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
              <p className="text-gray-800 mb-3 whitespace-pre-line">{blog.details}</p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full max-h-[500px] object-cover rounded-lg mb-3"
                />
              )}

              {/* Stats & Reactions */}
              <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{estimateReadTime(blog.details)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <VisitorCount blogId={blog._id} initialCount={blog.views} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 relative">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onMouseEnter={() => toggleReactionPicker(blog._id, true)}
                  onMouseLeave={() => toggleReactionPicker(blog._id, false)}
                >
                  <Heart className={`w-5 h-5 ${blog.userReaction ? "text-red-600" : "text-gray-500"}`} />
                  {Object.values(blog.reactions).reduce((a, b) => a + b, 0)}
                </div>

                {blog.showReactionPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-6 left-0 flex gap-2 bg-white p-2 rounded-full shadow-md border border-gray-200 z-10"
                  >
                    {reactionsList.map((r) => (
                      <span
                        key={r.type}
                        onClick={() => handleReaction(blog._id, r.type)}
                        className="cursor-pointer text-2xl hover:scale-125 transition-transform"
                      >
                        {r.emoji}
                      </span>
                    ))}
                  </motion.div>
                )}

                <button
                  onClick={() => handleShare(blog._id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                {blog.comments.map((c) => (
                  <div key={c._id || c.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <p className="bg-gray-100 px-3 py-2 rounded-xl text-gray-700">{c.text}</p>
                  </div>
                ))}
                <CommentInput blogId={blog._id} handleComment={handleComment} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentInput = ({ blogId, handleComment }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleComment(blogId, text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  );
};

export default BlogFeed;
