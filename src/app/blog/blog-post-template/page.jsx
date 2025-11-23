import { 
  BlogPostStyle,
  CodeSnippet,
  InfoBox,
  ImageWithCaption,
  FeatureGrid,
  QuoteBlock
} from '@/components/BlogPostStyle'
import { Code, Zap, Database, Lock, Globe } from 'lucide-react'

export const metadata = {
  title: 'Blog Post Title - Your Blog Name',
  description: 'A brief description of your blog post that will appear in search results and social media shares.'
}

export default function BlogPostTemplate() {
  return (
    <BlogPostStyle
      title="Your Blog Post Title"
      subtitle="Optional subtitle that provides additional context"
      date="2023-08-15"
      readingTime="8 min read"
      tags={["tag1", "tag2", "tag3"]}
      coverImage={{
        src: "/images/blog/cover-image.jpg",
        alt: "Description of the cover image",
        caption: "Optional caption for the cover image"
      }}
      author={{
        name: "Your Name",
        avatar: "/images/blog/your-avatar.jpg" // Optional
      }}
    >
      {/* Introduction */}
      <p className="text-xl mb-6 leading-relaxed">
        This is your introduction paragraph. It should be eye-catching and clearly communicate what the reader will learn from this post. Make it compelling enough to encourage readers to continue.
      </p>
      
      <p>
        Continue your introduction with more context. Explain why this topic matters and who will benefit from reading this post. Consider adding a brief overview of what will be covered.
      </p>
      
      <InfoBox type="info" title="What You'll Learn">
        <ul className="list-disc pl-6 space-y-1">
          <li>Key point 1 about what will be covered</li>
          <li>Key point 2 about what will be covered</li>
          <li>Key point 3 about what will be covered</li>
          <li>Key point 4 about what will be covered</li>
        </ul>
      </InfoBox>
      
      {/* Main Section 1 */}
      <h2>First Main Section</h2>
      
      <p>
        Start with a clear explanation of the first main concept. Use straightforward language and provide examples to illustrate your points. Remember that your readers might have different levels of familiarity with the subject.
      </p>
      
      <p>
        Follow up with more detailed information. This is where you can go deeper into the topic, providing valuable insights and practical advice. Break complex ideas into smaller, more digestible chunks.
      </p>
      
      <CodeSnippet 
        language="javascript" 
        title="Example Code" 
        caption="A simple example showing how to implement this concept"
      >
{`// This is an example code snippet
function exampleFunction() {
  const result = someOperation();
  console.log('The result is:', result);
  return result;
}

// You can call it like this
const output = exampleFunction();`}
      </CodeSnippet>
      
      <p>
        After the code snippet, explain what it does and why it's important. Point out any specific parts that readers should pay attention to.
      </p>
      
      {/* Main Section 2 */}
      <h2>Second Main Section</h2>
      
      <p>
        Introduce the second major topic of your blog post. Make sure to connect it logically to the first section, creating a natural flow of information.
      </p>
      
      <FeatureGrid
        features={[
          {
            title: "Feature One",
            description: "Description of the first feature and why it matters. Keep it concise but informative.",
            icon: <Code className="w-5 h-5 text-blue-500" />,
            color: "border-blue-500"
          },
          {
            title: "Feature Two",
            description: "Description of the second feature and its benefits. Focus on value to the reader.",
            icon: <Zap className="w-5 h-5 text-purple-500" />,
            color: "border-purple-500"
          },
          {
            title: "Feature Three",
            description: "Explanation of the third feature and how it can be implemented or utilized.",
            icon: <Database className="w-5 h-5 text-green-500" />,
            color: "border-green-500"
          },
          {
            title: "Feature Four",
            description: "Details about the fourth feature and what makes it special or useful.",
            icon: <Lock className="w-5 h-5 text-red-500" />,
            color: "border-red-500"
          }
        ]}
      />
      
      <h3>Subsection With More Detail</h3>
      
      <p>
        Dive deeper into a specific aspect of the second main section. This subsection allows you to explore a particular component or concept in greater detail.
      </p>
      
      <ImageWithCaption 
        src="/images/blog/example-image.jpg"
        alt="Description of the image" 
        caption="Descriptive caption that provides context for the image"
      />
      
      <p>
        After the image, provide additional context or explanation. Images can help break up text and illustrate complex concepts visually, making them easier to understand.
      </p>
      
      <QuoteBlock 
        author="Notable Person"
        source="Source Publication, Year"
      >
        This is an example of a quote that adds authority or a different perspective to your content. Choose quotes that enhance your message or provide expert insight.
      </QuoteBlock>
      
      {/* Main Section 3 */}
      <h2>Third Main Section</h2>
      
      <p>
        Introduce the final major section of your blog post. By this point, you should be building toward your conclusion and tying together the main points from earlier sections.
      </p>
      
      <InfoBox type="warning" title="Important Considerations">
        <p>
          Highlight potential challenges, common pitfalls, or important warnings that readers should be aware of. This helps set appropriate expectations and prepares readers for potential issues.
        </p>
      </InfoBox>
      
      <h3>Practical Application</h3>
      
      <p>
        Provide real-world examples or use cases that demonstrate how to apply the concepts discussed in your post. Practical examples help readers understand how to implement the information you've shared.
      </p>
      
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>First step in the process, explained clearly and concisely</li>
        <li>Second step, with any important details or considerations</li>
        <li>Third step, showing progression through the process</li>
        <li>Final step, completing the example or use case</li>
      </ol>
      
      <InfoBox type="success" title="Pro Tip">
        <p>
          Share an expert insight or shortcut that can help readers achieve better results or save time. These valuable tips demonstrate your expertise and add extra value to your post.
        </p>
      </InfoBox>
      
      {/* Conclusion */}
      <h2>Conclusion</h2>
      
      <p>
        Summarize the key points from your blog post, reinforcing the most important takeaways. Your conclusion should remind readers of what they've learned and why it matters.
      </p>
      
      <p>
        End with a call to action or next steps. This could be encouraging readers to try a technique, learn more about a related topic, or engage with you through comments or social media.
      </p>
      
      <p className="italic">
        If you found this post helpful, please share it with others who might benefit. And don't hesitate to reach out if you have questions or want to discuss these concepts further!
      </p>
    </BlogPostStyle>
  )
} 