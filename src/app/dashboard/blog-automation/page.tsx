'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import MDEditor from '@uiw/react-md-editor';

export default function BlogAutomation() {
  const [category, setCategory] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const generateCategories = () => {
    setSuggestedCategories(['Tech', 'Health', 'Business', 'Science']);
  };

  const generateTitles = () => {
    setSuggestedTitles([
      'The Future of Tech',
      'How to Stay Healthy',
      'Starting a Business',
      'The Science of Sleep',
    ]);
  };

  const generateContent = () => {
    setContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    );
  };

  const generateImage = () => {
    setImage('https://via.placeholder.com/600');
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
                className='flex-1'>
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
                className='flex-1'>
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
                className='w-full'
                variant='outline'
                onClick={generateContent}>
                Generate content with AI
              </Button>
            </div>

            <div className='pt-5'>
              <MDEditor
                value={content}
                onChange={(value) => setContent(value ?? '')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
