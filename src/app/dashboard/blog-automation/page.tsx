'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import MDEditor from '@uiw/react-md-editor';
import { Loader2Icon, Bot } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { generateContentAi } from '@/actions/googleAi';
import { LoadingName, LoadingState } from '@/types/types';

export default function BlogAutomation() {
  const [category, setCategory] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [suggestedContent, setSuggestedContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState<LoadingState>({
    name: '',
    status: false,
  });

  const { CATEGORIES, TITLES, CONTENT } = LoadingName;

  const generateCategories = async () => {
    // setSuggestedCategories(['Tech', 'Health', 'Business', 'Science']);
    setLoading({ name: CATEGORIES, status: true });

    try {
      const { categories } = await generateContentAi(`
        Suggest 20 of the most popular and relevant categories fpr a blogging application.
        Please return the response in JSON format like this: 
        {
          "categories": ["Tech", "Health", "Business", "Science"]
        }
      `);
      setSuggestedCategories(categories);
      console.log('categories:', categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ name: CATEGORIES, status: false });
    }
  };

  const generateTitles = async () => {
    if (!category) {
      toast.error('Please write or select a category first');
      return;
    }

    setLoading({ name: TITLES, status: true });

    try {
      const { titles } = await generateContentAi(`
        Suggest 3 SEO=optimized blog post titles for the category "${category}".
        The titles should be catchy, relevant and designed to attract traffic.
        Please return the response in JSON format like this:
        {
          "titles": ['The Future of Tech', 'How to Stay Healthy in 2025', 'Starting a Business in 2025']
        }
      `);
      setSuggestedTitles(titles);
      console.log('titles:', titles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ name: TITLES, status: false });
    }
  };

  const generateContent = async () => {
    if (!title) {
      toast.error('Please write or select a title first');
      return;
    }

    setLoading({ name: CONTENT, status: true });

    try {
      const { content } = await generateContentAi(`
        Generate a SEO-optimized blog post on the topic: ${title}.
        The post should be written in a clear, easy-to-understand language suitable for broad audience. Ensure the content is human-friendly and engaging while incorporating relevant SEO keywords.
        Please return the response in JSON format as follows:
        {
          "content": "Your blog content here."
        }
          Content must be written in semantic HTML format including multiple headings, bullet points, paragraphs, etc but excluding <DOCTYPE> <html> <body> <head> <meta> sections and use <code> blocks as needed only. Include summary section at the end of the content, but do not include keywords: section at the end.
      `);
      setSuggestedContent(content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ name: CONTENT, status: false });
    }
  };

  const generateImage = () => {
    setImage('https://placehold.co/600');
  };

  const handleSubmit = () => {
    console.log({
      category,
      title,
      suggestedContent,
      image,
    });
  };

  return (
    <div>
      <Card className='w-full max-w-6xl mx-auto my-5'>
        <CardHeader>
          <CardTitle>Create A New Blog Post</CardTitle>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='category'>Category</Label>

            <div className='flex gap-2'>
              <Input
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter category name'
                className='flex-1'
              />

              <Button
                onClick={generateCategories}
                variant='outline'
                className='flex-1'
                disabled={loading.name === CATEGORIES && loading.status}>
                {loading.name === CATEGORIES && loading.status ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <Bot />
                )}
                Get Categories Suggestions from AI
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              {suggestedCategories.map((suggestedCategory) => (
                <Button
                  key={suggestedCategory}
                  variant={
                    category === suggestedCategory ? 'default' : 'outline'
                  }
                  onClick={() => setCategory(suggestedCategory)}>
                  {suggestedCategory}
                </Button>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>

            <div className='flex gap-2'>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter your blog post title'
                className='flex-1'
              />

              <Button
                onClick={generateTitles}
                variant='outline'
                className='flex-1'
                disabled={loading.name === TITLES && loading.status}>
                {loading.name === TITLES && loading.status ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <Bot />
                )}
                Get Titles Suggestions from AI
              </Button>
            </div>

            {suggestedTitles.length > 0 && (
              <div className='mt-2'>
                <Label>Suggested Titles:</Label>

                <div className='grid gap-2 mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  {suggestedTitles.map((suggestedTitle) => (
                    <button
                      key={suggestedTitle}
                      className={`justify-start p-2 cursor-pointer ${
                        title === suggestedTitle
                          ? 'border rounded-md bg-black text-white dark:bg-white dark:text-black'
                          : ''
                      }`}
                      onClick={() => setTitle(suggestedTitle)}>
                      {suggestedTitle}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category'>Content</Label>

            <div className='flex gap-2'>
              <Button
                onClick={generateContent}
                variant='outline'
                className='w-full'
                disabled={loading.name === CONTENT && loading.status}>
                {loading.name === CONTENT && loading.status ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <Bot />
                )}
                Generate content with AI
              </Button>
            </div>

            <div className='pt-5'>
              <MDEditor
                value={suggestedContent}
                onChange={(value) => setSuggestedContent(value ?? '')}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image'>Featured Image</Label>

            <div className='flex gap-2 items-center'>
              <Button
                className='flex-1'
                onClick={generateImage}
                variant='outline'>
                Generate Image
              </Button>

              {image && (
                <div className='flex-1'>
                  <Image
                    width={600}
                    height={600}
                    src={image}
                    alt='Featured Image'
                    className='mt-2 max-w-full h-auto rounded-lg'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Button className='w-full' onClick={handleSubmit}>
              Submit Blog Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
