import { ChangeEvent, useState } from "react";

const coordinateToIndex = (coordinate: string): number => {
    if (!/[a-h][1-8]/.exec(coordinate)) return -1;
  
    const x = coordinate.charCodeAt(0) - 'a'.charCodeAt(0); // a -> 0, b -> 1, ...
    const y = 8 - parseInt(coordinate[1]); // 8 - y, because the 8th rank is y = 0
  
    return 10 * y + x;
  };

  
  const directionMap = {
      'E': 1,
      'S': 10,
      'W': -1,
      'N': -10
} as const

const parseDirection = (direction: string): number => {
    return direction.split('').reduce((accumulator: number, value: string) => accumulator + (directionMap[value as keyof typeof directionMap] || 0), 0);
}

type BehaviourProps = {
    setElephant: (index: number) => void,
    setDirections: (directions: number[]) => void
}

export function BehaviourTextArea(props: BehaviourProps) {
    const { setElephant, setDirections } = props

    const [changed, setChanged] = useState(false);
    const [text, setText] = useState('position = \ndirections = \nbeam = false');
  
    const applyChanges = () => {
      setChanged(false);

      const positionMatch = /position.*?(\b[a-h][1-8]\b)/.exec(text); // Extract the position of the elephant
      const directionsMatch = text.match(/[ESWN]+/g)

      
      const index = positionMatch ? coordinateToIndex(positionMatch[1]) : -1;
      setElephant(index);

      const directions = directionsMatch?.map(parseDirection).map(direction => direction + index) ?? []
      setDirections(directions)
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setChanged(true);
      setText(e.target.value);
    };
  
    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.ctrlKey && e.key === 'Enter') {
        applyChanges();
      }
    };
  
    return (
      <div className='border-slate-200'>
        <div className='flex justify-between px-8 h-10 bg-slate-100 rounded-t-md items-center'>
          <div className=''>Elephant</div>
          {changed && (
            <button
              onClick={applyChanges}
              className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center'
            >
              Apply
            </button>
          )}
        </div>
        <div className='flex'>
          <div className='w-8 border-2 flex flex-col bg-slate-100'>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                className='w-full px-1 flex items-center justify-end text-slate-400 text-opacity-70 h-8'
                key={i}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            value={text}
            onKeyDown={handleEnter}
            onChange={handleInputChange}
            spellCheck='false'
            className='border-2 px-1 resize-none w-80 h-80 outline-none leading-8'
          />
        </div>
      </div>
    );
  }