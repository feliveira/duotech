/* eslint-disable react/no-unescaped-entities */
"use client"

import 'animate.css';
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Check, Coffee, Flame, X, Github } from "lucide-react"
import { useAppContext } from '@/hooks/useAppContext';
import LessonBar from "./lesson-bar"
import RefillHeartsDialog from './refill-hearts-dialog';
import Link from 'next/link';
import IDLE from "/public/static/character/idle.png"
import CORRECT from "/public/static/character/correct.png"
import WRONG from "/public/static/character/wrong.png"
import Image from 'next/image';

interface LessonLocalizationType {
    lang : {
        title: string,
        correct: string,
        button: {
            check: string,
            continue: string,
        }
        feedback: {
            correct: string[],
            wrong: string
        },
        finish: {
            title: string,
            coffees: string,
            streak: string,
            github: string
        },
        refill: {
            title: string,
            main_description: string,
            secondary_description: string,
            coffees: string,
            lives: string,
            button: {
                continue: string,
                refill: string,
                cancel: string,
            }
        },
        bar: {
            title: string,
            description: string,
            keep: string,
            end: string
        }
        questions: {
            id: number,
            question: string
            answers: string[]
            solution: string[]
        }[]
    },
    locale: string
}


export default function LessonContainer( { lang, locale } : LessonLocalizationType  )
{
    const { lives, setLives, setCoffees, streak, setStreak } = useAppContext( )
    
    const [questions, setQuestions] = useState( lang.questions )
    const [wrongQuestions, setWrongQuestions] = useState<typeof currentQuestion[]>( [] )
    const [currentQuestion, setCurrentQuestion] = useState( lang.questions[ 0 ] )
    const [questionCheck, setQuestionCheck] = useState( { isChecking: false, isCorrect: false } )
    const [currentAnswer, setCurrentAnswer] = useState<string[]>( [ ] )
    const [showWrongMessage, setShowWrongMessage] = useState({alreadyShown: false, isShowing: false});
    const [progress, setProgress] = useState( -1 )

    const PROGRESS_COLORS = ["bg-owl", "bg-lion", "bg-fox"]

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

        setLives(lives => lives - 1);
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
                    setQuestions(filteredQuestions)
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

        if( !wrongQuestions.length && !questions.length )
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

    function checkIfDateIsToday(date : Date) {
        const today = new Date( )

        const day1 = today.getDate();
        const month1 = today.getMonth();
        const year1 = today.getFullYear();

        const day2 = date.getDate();
        const month2 = date.getMonth();
        const year2 = date.getFullYear();

        return day1 === day2 && month1 === month2 && year1 === year2;
    }

    const completeLesson = ( ) => {
        setProgress( 100 )
        setCoffees( coffees => coffees + 100 )

        if( !streak )
        {
            setStreak( { value: 1, lastDoneDate: new Date( ) } )
            return
        }

        if( !checkIfDateIsToday( new Date( streak.lastDoneDate ) ) )
        {
            setStreak( state => ( { value: state!.value + 1, lastDoneDate: new Date( ) } ))
        }

    }

    useEffect(( ) => {
        if( questions.length )
        {
            setProgress( 100 - (((questions.length + wrongQuestions.length) / lang.questions.length) * 100 ))
            setCurrentAnswer( [] )
            setCurrentQuestion( questions[0] )
            setQuestionCheck( questionCheck => ({...questionCheck, isChecking: false }) )
        }
    }, [questions])

    useEffect(( ) => {
        if( !questions.length )
        {
            setProgress( 100 - (((questions.length + wrongQuestions.length) / lang.questions.length) * 100 ))
            setCurrentAnswer( [] )
            setCurrentQuestion( wrongQuestions[0] )
            setQuestionCheck( questionCheck => ({...questionCheck, isChecking: false }) )
        }
    }, [wrongQuestions])

    return (
        <>
        {
            (questions.length > 0 || wrongQuestions.length > 0) ?
            <div className="flex flex-col items-center mx-auto w-full">
                <LessonBar lang={lang.bar} color={getColor( )} progress={progress} lives={lives} />
                {
                showWrongMessage.isShowing ?
                <div className="animate__animated animate__fadeInRightBig flex flex-col items-center justify-center mx-auto mt-16 max-w-[800px] w-[90%]">
                    <p className="font-semibold text-2xl mx-auto">{ lang.correct }</p>
                </div>
                :
                <div key={ currentQuestion.id } className="animate__animated animate__fadeInRightBig animate__faster flex flex-col mx-auto mt-4 max-w-[800px] w-[90%]">
                    <div className="mx-auto">
                        <h1 className="text-2xl text-eel font-semibold mb-4">{ lang.title }</h1>
                        <div className="flex space-x-2 px-2">
                            <Image src={questionCheck.isChecking ? questionCheck.isCorrect ? CORRECT : WRONG : IDLE} className="h-36 object-cover min-w-[112px] w-40" alt="" />
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
                                <button onClick={( ) => handleAnswerSelection( answer )} key={answer} className={cn("rounded-xl px-3 py-1 border shadow-[0px_4px_0px_0px_#E5E5E5] active:shadow-none active:translate-y-1", currentAnswer.includes(answer) ? "bg-swan" : "bg-white", questionCheck.isChecking && "pointer-events-none select-none" )}>
                                    <p className={cn(currentAnswer.includes(answer) && "opacity-0")}>{ answer}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
                }
                <div className={cn("flex-1 fixed bottom-0 py-10 border-t w-full flex items-center justify-center animate__animated animate__bounceInUp", questionCheck.isChecking ? questionCheck.isCorrect ? "bg-seasponge" : "bg-red-200" : "bg-white")}>
                    {
                        questionCheck.isChecking && !showWrongMessage.isShowing ?
                        <div className="flex justify-between items-center max-w-[800px] w-[90%] animate__animated animate__bounceInUp animate__faster">
                            <div className={cn("flex space-x-2", questionCheck.isCorrect && "items-center")}>
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    {
                                        questionCheck.isCorrect ?
                                        <Check strokeWidth={5} className="text-treefrog w-8 h-8" />
                                        :
                                        <X strokeWidth={5} className="text-cardinal w-8 h-8" />
                                    }
                                </div>
                                {
                                    questionCheck.isCorrect ?
                                    <p className="text-treefrog font-semibold text-lg">{lang.feedback.correct[Math.floor(Math.random() * lang.feedback.correct.length)]}</p>
                                    :
                                    <div className="flex flex-col">
                                        <p className="text-fireant mb-1 font-semibold text-sm md:text-lg">{lang.feedback.wrong}</p>
                                        <p className="text-sm text-fireant">{currentQuestion.solution[ 0 ]}</p>
                                    </div>
                                }
                            </div>
                            <button onClick={proceedQuestionFlow} className={cn("uppercase rounded-[16px] px-8 py-3 text-xs md:text-lg font-semibold text-white active:shadow-none active:translate-y-1", questionCheck.isCorrect ? "bg-owl shadow-[0px_4px_0px_0px_#58A700]" : "bg-cardinal shadow-[0px_4px_0px_0px_#FF2F2F]")}>
                                { lang.button.continue }
                            </button> 

                        </div>
                        :
                        showWrongMessage.isShowing ?
                        <button onClick={proceedToWrongQuestions} className=" rounded-[16px] px-8 py-3 text-lg font-semibold bg-owl text-white shadow-[0px_4px_0px_0px#58A700] active:shadow-none active:translate-y-1">
                            { lang.button.continue }
                        </button> 
                        :
                        <button onClick={checkAnswer} disabled={currentAnswer.length === 0} className={cn("rounded-[16px] px-14 py-3 text-xl font-semibold", currentAnswer.length ? "bg-owl text-white shadow-[0px_4px_0px_0px#58A700] active:shadow-none active:translate-y-1" : "bg-swan text-wolf cursor-default")}>
                            { lang.button.check }
                        </button>    
                    }
                    
                </div>
            </div>
            :
            <div className="relative w-full h-full flex flex-col justify-between p-2">
                <div className="flex flex-col lg:flex-row lg:justify-between w-full h-full items-center lg:items-start justify-center gap-4 lg:gap-0 mb-16">
                    <div className="w-[90%] max-w-[400px] lg:max-w-full lg:w-1/2">
                        <div className="w-full lg:h-[500px] 2xl:h-[850px] flex flex-col items-center justify-center border lg:border-none p-4 shadow-[0px_4px_0px_0px_#E5E5E5] rounded-md rounded-tr-none text-center">
                            <p className="text-whale font-semibold text-2xl mb-4 animate__animated animate__fadeInDown">{lang.finish.title}</p>
                            <div className="flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-2 animate__animated animate__fadeInLeft">
                                <div className="w-48 p-1 bg-whale rounded-xl flex flex-col items-center justify-center">
                                    <p className="text-white font-semibold mb-2 text-sm">{lang.finish.coffees}</p>
                                    <div className="flex items-center justify-center bg-white rounded-[8px] w-full p-4 space-x-2">
                                        <Coffee className="w-8 h-8 fill-macaw text-whale" />
                                        <p className="text-whale font-semibold">+100</p>
                                    </div>
                                </div>
                                {
                                    streak != null &&
                                    <div className="w-48 p-1 bg-fox rounded-xl flex flex-col items-center justify-center">
                                        <p className="text-white font-semibold mb-2 text-sm">{lang.finish.streak}</p>
                                        <div className="flex items-center justify-center bg-white rounded-[8px] w-full p-4 space-x-2">
                                            <Flame className="w-8 h-8 text-fox fill-lion" />
                                            <p className="text-fox font-semibold">{ streak.value }</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] max-w-[400px] lg:max-w-full lg:w-1/2">
                        <div className="lg:h-[500px] 2xl:h-[850px] flex flex-col items-center justify-center border lg:border-none p-4 shadow-[0px_4px_0px_0px_#E5E5E5] rounded-md rounded-tl-none text-center">
                            <a href="https://github.com/feliveira" className="flex flex-col items-center justify-center hover:scale-105 transition-all animate__animated animate__fadeInRight" target="_blank">
                                <Github className="text-whale w-16 h-16" />
                                <p className="font-semibold text-whale">{lang.finish.github}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex-1 fixed bottom-0 bg-white py-10 border-t w-full flex items-center justify-center animate__animated lg:animate__bounceInUp">
                    <Link href={locale === "pt" ? "/pt/learn" : "/en/learn" } className="rounded-[16px] px-14 py-3 text-xl font-semibold bg-owl text-white shadow-[0px_4px_0px_0px#58A700] active:shadow-none active:translate-y-1">
                        { lang.button.continue } 
                    </Link> 
                </div>
            </div>
        }
        <RefillHeartsDialog lang={lang.refill} />
        </>)
}