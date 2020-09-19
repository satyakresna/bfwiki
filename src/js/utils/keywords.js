export function getUnitKeywords() {
    const unitKeywords = ["extra action", "evasion", "activates BB/SBB/UBB twice",
        "DoT mitigation", "negate all status ailments",
        "negates all status ailments",
        "negates all status ailments for all allies",
        "Stealth", "normal attacks may hit all foes",
        "raises normal hit amount", "status ailment removal",
        "def ignoring effect",
        "reduces BB gauge required",
        "reduction to BB activation cost",
        "fills OD gauge",
        "boosts OD gauge",
        "status ailments infliction",
        "resistance against KO attack",
        "resistance against 1 KO attack",
        "resistance against 2 KO attacks",
        "Adds Doom effect purge from self to BB/UBB",
        "purges Doom",
        "raises allies from KO",
        "purges LS and ES Lock",
        "DoT mitigation",
        "boost to Summoner Avatar EXP gained",
        "boost to Summoner EXP gained",
        "boost to EXP gained",
        "removes all status ailments",
        "boosts ABP and CBP gain",
        "elemental damage reduction"
    ];
    return unitKeywords.map(keyword => {
        return {
            value: keyword,
            label: keyword,
            id: keyword
        }
    });
}

export function getDbbKeywords () {
    const dbbKeywords = [
        "100% evasion",
        "80% evasion",
        "OD gauge",
        "activates BB/SBB/UBB twice",
        "purges LS and ES Lock",
        "100% DoT reduction",
        "raises normal hit amount",
        "adds status ailment infliction to attack",
        "raises allies from KO",
        "KO resistance",
        "perform 1 extra action within the same turn"
    ];

    return dbbKeywords.map(keyword => {
        return {
            value: keyword,
            label: keyword,
            id: keyword
        }
    });
}