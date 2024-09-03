import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { addComment } from '@/redux/features/commentsSlice';



export default function ProductReview({productId}: {productId: number}) {
  const [comment, setcomment] = useState('')
  console.log(comment)
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments.comments.filter(comment => comment.productId === productId))
  const handleAddComment = ()=>{
    dispatch(addComment({
      id: new Date().getTime(),
      productId,
      content: comment,

    }))
    setcomment('');
  }


  return (
    <div className="max-w-7xl mx-auto mt-5">
      <h1 className="mt-5 text-2xl font-semibold py-5">Review</h1>
      <div className="flex gap-5 items-center">
        <Textarea
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          className="min-h-[30px]"
        />
        <Button
          onClick={handleAddComment}
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://i.ibb.co/BC10fd9/pxfuel-30.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
