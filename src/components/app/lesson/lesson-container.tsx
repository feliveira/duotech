/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import defaultQuestions from "@/data/questions.json"
import LessonBar from "./lesson-bar"
import { cn } from "@/lib/utils"
import 'animate.css';
import { Check, X } from "lucide-react"

export default function LessonContainer( )
{
    
    const [questions, setQuestions] = useState( defaultQuestions )
    const [wrongQuestions, setWrongQuestions] = useState<typeof currentQuestion[]>( [] )
    const [currentQuestion, setCurrentQuestion] = useState( defaultQuestions[ 0 ] )
    const [questionCheck, setQuestionCheck] = useState( { isChecking: false, isCorrect: false } )
    const [currentAnswer, setCurrentAnswer] = useState<string[]>( [ ] )
    const [showWrongMessage, setShowWrongMessage] = useState({alreadyShown: false, isShowing: false});
    const [progress, setProgress] = useState( -1 )
    const PROGRESS_COLORS = ["bg-[#00b4d8]", "bg-[#0077b6]", "bg-[#023e8a]"]

    const getColor = () => {
        if (progress >= 70) return PROGRESS_COLORS[2];
        if (progress >= 50) return PROGRESS_COLORS[1];
        return PROGRESS_COLORS[0];
    };

    const handleAnswerSelection = ( answer : string ) => {

        if( currentAnswer.includes( answer ) ) return

        setCurrentAnswer( state => [...state, answer] )
    }

    const handleAnswerRemove = ( answer : string ) => {

        setCurrentAnswer( state => state.filter(a => a != answer) )
    }

    const checkAnswer = ( ) => {
        if( currentAnswer.join(" ") === currentQuestion.solution.join(" ") )
        {
            setQuestionCheck( { isChecking: true, isCorrect: true } )
            return
        }

        setQuestionCheck( { isChecking: true, isCorrect: false } )
    }

    const proceedQuestionFlow = ( ) => {
        if( questions.length )
        {
            const filteredQuestions = questions.filter(question => question.id != currentQuestion.id)
            if( !filteredQuestions.length )
            {
                if ( !wrongQuestions.length )
                {
                    completeLesson( )
                    return
                }

                setQuestions(questions)
                setQuestionCheck(state => ({...state, isChecking: false}))
                setShowWrongMessage( { alreadyShown: true, isShowing: true } )

            }
            setQuestions( filteredQuestions )
        }

        if( !questionCheck.isCorrect )
        {
            if( !questions.length )
            {
                const filteredQuestions = [...wrongQuestions.filter(question => question.id != currentQuestion.id), currentQuestion]
                
                setWrongQuestions( filteredQuestions )
                return
            }

            setWrongQuestions( state => [...state, currentQuestion] )
            return
        }

        if( !wrongQuestions.length )
        {
            completeLesson( )
            return
        }

        if( !showWrongMessage.alreadyShown && !questions.length )
        {
            setQuestionCheck( state => ({...state, isChecking: false}) )
            setShowWrongMessage( { alreadyShown: true, isShowing: true } )
            return
        }

        const filteredQuestions = wrongQuestions.filter(question => question.id != currentQuestion.id)
        setWrongQuestions( filteredQuestions )

    }

    const proceedToWrongQuestions = ( ) => {
        setShowWrongMessage( state => ({...state, isShowing: false}) )
        setCurrentAnswer( [ ] )
        setCurrentQuestion( wrongQuestions[ 0 ] )
    }

    const completeLesson = ( ) => {
        setProgress(100)
    }

    useEffect(( ) => {
        if( questions.length )
        {
            setQuestionCheck( questionCheck => ({...questionCheck, isChecking: false }) )
            setProgress( 100 - (((questions.length + wrongQuestions.length) / defaultQuestions.length) * 100 ))
            setCurrentAnswer( [] )
            setCurrentQuestion( questions[0] )
        }
    }, [questions])

    useEffect(( ) => {
        if( !questions.length )
        {
            setQuestionCheck( questionCheck => ({...questionCheck, isChecking: false }) )
            setProgress( 100 - (((questions.length + wrongQuestions.length) / defaultQuestions.length) * 100 ))
            setCurrentAnswer( [] )
            setCurrentQuestion( wrongQuestions[0] )
        }
    }, [wrongQuestions])

    return (
        <>
        {
            (questions.length > 0 || wrongQuestions.length > 0) ?
            <div className="flex flex-col items-center mx-auto w-full">
                <LessonBar color={getColor( )} progress={progress} />
                <p>{questions.map(q => `${q.id}-`)}</p>
                <p>{100 - (((questions.length + wrongQuestions.length) / defaultQuestions.length) * 100)}</p>
                {
                showWrongMessage.isShowing ?
                <div className="animate__animated animate__fadeInRightBig flex flex-col mx-auto mt-4 max-w-[800px] w-[90%]">
                    <p className="font-semibold text-2xl mx-auto">Let's correct your mistakes!</p>
                </div>
                :
                <div className="animate__animated animate__fadeInRightBig flex flex-col mx-auto mt-4 max-w-[800px] w-[90%]">
                    <div className="mx-auto">
                        <h1 className="text-2xl text-neutral-700 font-semibold mb-4">Answer the following question</h1>
                        <div className="flex space-x-2 px-2">
                            <span className="h-36 min-w-[112px] w-28 bg-neutral-400" />
                            <p className="rounded-xl border h-fit p-4 max-w-[300px]">{ currentQuestion.question }</p>
                        </div>
                    </div>
                    <div className="border-y min-h-[56px] w-[90%] mx-auto flex flex-wrap">
                        {
                            currentAnswer.map(answer => (
                                <button onClick={( ) => handleAnswerRemove( answer )} key={answer} className="whitespace-nowrap m-2 h-fit rounded-xl px-2 py-1 border shadow-[0px_4px_0px_0px_#E5E5E5] active:shadow-none active:translate-y-1">
                                    {answer}
                                </button>
                            ))
                        }
                    </div>
                    <div className="mt-8 flex justify-center items-center flex-wrap w-full gap-2">
                        {
                            currentQuestion.answers.map(answer => (
                                <button onClick={( ) => handleAnswerSelection( answer )} key={answer} className={cn("rounded-xl px-3 py-1 border shadow-[0px_4px_0px_0px_#E5E5E5] active:shadow-none active:translate-y-1", currentAnswer.includes(answer) ? "bg-neutral-200" : "bg-white", questionCheck.isChecking && "pointer-events-none select-none" )}>
                                    <p className={cn(currentAnswer.includes(answer) && "opacity-0")}>{ answer}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
                }
                <div className={cn("fixed bottom-0 py-10 border-t w-full flex items-center justify-center animate__animated animate__bounceInUp", questionCheck.isChecking ? questionCheck.isCorrect ? "bg-green-200" : "bg-red-200" : "bg-white")}>
                    {
                        questionCheck.isChecking && !showWrongMessage.isShowing ?
                        <div className="flex justify-between items-center max-w-[800px] w-[90%] animate__animated animate__bounceInUp animate__faster">
                            <div className={cn("flex space-x-2", questionCheck.isCorrect && "items-center")}>
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    {
                                        questionCheck.isCorrect ?
                                        <Check strokeWidth={5} className="text-green-600 w-8 h-8" />
                                        :
                                        <X strokeWidth={5} className="text-red-500 w-8 h-8" />
                                    }
                                </div>
                                {
                                    questionCheck.isCorrect ?
                                    <p className="text-green-600 font-extrabold text-lg">Correct!</p>
                                    :
                                    <div className="flex flex-col">
                                        <p className="text-red-500 mb-1 font-extrabold text-lg">Correct Solution:</p>
                                        <p className="text-sm text-red-500">{currentQuestion.solution[ 0 ]}</p>
                                    </div>
                                }
                            </div>
                            <button onClick={proceedQuestionFlow} className={cn("rounded-xl px-14 py-3 text-xl font-semibold text-white active:shadow-none active:translate-y-1", questionCheck.isCorrect ? "bg-green-600 shadow-[0px_4px_0px_0px_#15803d]" : "bg-red-500 shadow-[0px_4px_0px_0px_#b91c1c]")}>
                                Continue
                            </button> 

                        </div>
                        :
                        showWrongMessage.isShowing ?
                        <button onClick={proceedToWrongQuestions} className="rounded-xl px-14 py-3 text-xl font-semibold bg-green-500 text-white shadow-[0px_4px_0px_0px_#15803d] active:shadow-none active:translate-y-1">
                            Continue
                        </button> 
                        :
                        <button onClick={checkAnswer} className={cn("rounded-xl px-14 py-3 text-xl font-semibold", currentAnswer.length ? "bg-green-500 text-white shadow-[0px_4px_0px_0px_#15803d] active:shadow-none active:translate-y-1" : "bg-neutral-200 text-neutral-600 cursor-default")}>
                            Check
                        </button>    
                    }
                    
                </div>
            </div>
            :
            //Finish screen
            <div className="flex items-center">
            </div>
        }
        </>)
}



// if( questionCheck.isCorrect )
// {
//     const filteredQuestions = questions.filter( q => q.id != currentQuestion.id )

//     if( filteredQuestions.length === 0 )
//     {
//         completeLesson( )
//         return
//     }   

//     setQuestions( filteredQuestions )
//     return
// }

// const corrected