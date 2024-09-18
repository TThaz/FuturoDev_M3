import './new-cycle.css'
import { useFormContext } from 'react-hook-form'

export function NewCycle() {
    const { register, formState } = useFormContext()

    formState.errors

    return (
        <div className='container--new-cycle'>
            <label htmlFor="task">Vou trabalhar em:</label>
            <div className='container--input-form'>
                <input
                    type="text"
                    id="task"
                    placeholder='Dê um nome para seu projeto'
                    {...register('task',
                        {
                            required:
                            {
                                value: true,
                                message: 'Este campo é obrigatório!'
                            }
                        })}
                />
                {formState.errors.task && (
                    <p className='text-error'>
                        {formState.errors.task.message}
                    </p>
                )}
            </div>

            <label htmlFor="minutesAmount">durante</label>
            <div className='container--input-form'>
                <input
                    type="number"
                    id="minutesAmount"
                    placeholder='00'
                    {...register('minutesAmount',
                    {
                        required: {
                            value: true,
                            message: 'Esse campo é obrigatório'
                        },
                        valueAsNumber: {
                            value: true
                        }
                    }
                        )} />

                {formState.errors.minutesAmount && (
                    <p className='text-error'>
                        {formState.errors.minutesAmount.message}
                    </p>
                )}


            </div>
            <span>minutos.</span>
        </div>
    )
}