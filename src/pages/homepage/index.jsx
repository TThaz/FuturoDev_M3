import { useForm, FormProvider } from "react-hook-form";
import { useCycle } from "../../contexts/cycle";

import { Button } from "../../components/button";
import { NewCycle } from "../../components/new-cycle";
import { Timer } from "../../components/timer";

import "./home.css";
import { OctagonX, Play } from "lucide-react";

export function HomePage() {
    const methods = useForm({
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });
    const { createNewCycle, activeCycle, interruptedCurrentCycle } = useCycle();
    const { handleSubmit, reset, watch } = methods;

    // JSDOC => Utilizado para melhorar a documentação do código
    /**
     *
     * @param {Object} data  Dados para criação de um novo ciclo
     * @param {String} data.task
     * @param {number} data.minutesAmount
     *
     * @example
     * const task = 'Aprender JSDoc'
     * const minutesAmount = 25
     * createNewCycle({task, minutesAmount})
     */

    // Pode ser passado 'data' como parâmetro por ter a criação do JSDOC,
    // Que identifica os itens dentro de 'data'

    function onSubmit(data) {
        createNewCycle(data);
        reset();
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <form className="container--home" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <NewCycle />
            </FormProvider>

            <Timer />

            {activeCycle ? (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={interruptedCurrentCycle}
                >
                    <OctagonX size={24} /> Interromper
                </Button>
            ) : (
                <Button type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </Button>
            )}
        </form>
    );
}
