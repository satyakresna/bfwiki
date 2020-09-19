const keywords = ["extra action", "evasion", "activates BB/SBB/UBB twice",
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
    "raises allies from KO"
];

export default function () {
    return keywords.map(keyword => {
        return {
            value: keyword,
            label: keyword,
            id: keyword
        }
    });
}