import { useState, useEffect } from 'react';

export type WorkbookData = {
  // Part 1
  currentMovieTitle: string;
  currentGenre: string;
  audience: string;
  currentCharacterName: string;
  currentCharacterDesc: string;
  cinematicValue: string;
  cinematicValueReason: string;
  cinematicValueChange: string;
  roleFamily: string;
  roleWork: string;
  roleProfession: string;
  roleHobbies: string;
  roleTravel: string;
  rolePartner: string;
  roleSpirituality: string;
  roleFriends: string;
  roleFun: string;
  roleGrowth: string;
  roleEducation: string;
  coherence: string;
  coherenceExplain: string;
  dislikeScenes: string;
  dislikeAttitudes: string;
  costOf10Years: string;

  // Part 2
  breakingPoint: string;
  creativeDecision: string;

  // Part 3
  newMovieTitle: string;
  newGenre: string;
  scene1: string;
  scene2: string;
  scene3: string;
  scene4: string;
  scene5: string;
  scene6: string;

  // Part 4
  level1Purpose: string;
  level2Identity: string;
  level3Beliefs: string;
  level3ValueGuide: string;
  level4Skills: string;
  level5Greet: string;
  level5Talk: string;
  level5Habits: string;
  level6Environment: string;

  // Final
  signature: string;
  date: string;
};

const defaultData: WorkbookData = {
  currentMovieTitle: '',
  currentGenre: '',
  audience: '',
  currentCharacterName: '',
  currentCharacterDesc: '',
  cinematicValue: '',
  cinematicValueReason: '',
  cinematicValueChange: '',
  roleFamily: '',
  roleWork: '',
  roleProfession: '',
  roleHobbies: '',
  roleTravel: '',
  rolePartner: '',
  roleSpirituality: '',
  roleFriends: '',
  roleFun: '',
  roleGrowth: '',
  roleEducation: '',
  coherence: '',
  coherenceExplain: '',
  dislikeScenes: '',
  dislikeAttitudes: '',
  costOf10Years: '',
  breakingPoint: '',
  creativeDecision: '',
  newMovieTitle: '',
  newGenre: '',
  scene1: '',
  scene2: '',
  scene3: '',
  scene4: '',
  scene5: '',
  scene6: '',
  level1Purpose: '',
  level2Identity: '',
  level3Beliefs: '',
  level3ValueGuide: '',
  level4Skills: '',
  level5Greet: '',
  level5Talk: '',
  level5Habits: '',
  level6Environment: '',
  signature: '',
  date: '',
};

export function useWorkbook() {
  const [data, setData] = useState<WorkbookData>(() => {
    if (typeof window === 'undefined') return defaultData;
    const saved = localStorage.getItem('reto-revoluciona-imagen');
    if (saved) {
      try {
        return { ...defaultData, ...JSON.parse(saved) };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('reto-revoluciona-imagen', JSON.stringify(data));
  }, [data]);

  const updateField = (field: keyof WorkbookData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return { data, updateField };
}
