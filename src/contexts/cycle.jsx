import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CycleContext = createContext({
  cycles: [],
  activeCycleId: null,
  activeCycle: undefined,
  createNewCycle: () => {},
  markCurrentCycleAsFinished: () => {},
  interruptedCurrentCycle: () => {},
});

const CYCLES_KEY_LOCALSTORAGE = "@timer_modulo_3:cycles-1.0.0";
const ACTIVE_CYCLE_LOCALSTORAGE = "@timer_modulo_3:active-cycle-1.0.0";

export function CycleProvider({ children }) {
  const [cycles, setCycles] = useState(() => {
    const cyclesStorage = localStorage.getItem(CYCLES_KEY_LOCALSTORAGE);

    if (cyclesStorage) {
      return JSON.parse(cyclesStorage);
    }

    return [];
  });

  const [activeCycleId, setActiveCycleId] = useState(() => {
    const activeCycleStorage = localStorage.getItem(ACTIVE_CYCLE_LOCALSTORAGE);

    return activeCycleStorage;
  });

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

  function createNewCycle({ task, minutesAmount }) {
    const id = String(new Date().getTime());
    const newCycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevCycles) => {
      let newCycleState = [...prevCycles, newCycle];

      localStorage.setItem(
        CYCLES_KEY_LOCALSTORAGE,
        JSON.stringify(newCycleState)
      );

      return newCycleState;
    });
    setActiveCycleId(id);
    localStorage.setItem(ACTIVE_CYCLE_LOCALSTORAGE, id);
  }

  function markCurrentCycleAsFinished() {
    const newStateCycle = cycles.map((cycle) => {
      if (cycle.id == activeCycleId) {
        return {
          ...cycle,
          finishedDate: new Date(),
        };
      }
      return cycle;
    });
    setCycles(newStateCycle);
    setActiveCycleId(null);
    localStorage.setItem(
      CYCLES_KEY_LOCALSTORAGE,
      JSON.stringify(newStateCycle)
    );
    localStorage.removeItem(ACTIVE_CYCLE_LOCALSTORAGE);
  }

  function interruptedCurrentCycle() {
    const newStateCycle = cycles.map((cycle) => {
      if (cycle.id == activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date(),
        };
      }
      return cycle;
    });

    setCycles(newStateCycle);
    setActiveCycleId(null);

    localStorage.setItem(
      CYCLES_KEY_LOCALSTORAGE,
      JSON.stringify(newStateCycle)
    );
    localStorage.removeItem(ACTIVE_CYCLE_LOCALSTORAGE);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycleId,
        createNewCycle,
        activeCycle,
        markCurrentCycleAsFinished,
        interruptedCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}

CycleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCycle() {
  const context = useContext(CycleContext);
  return context;
}
