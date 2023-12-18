export const getJiraToken = () => {
    const token = Buffer.from(`${process.env.jiramail}:${process.env.jiratoken}`).toString('base64')
    return `Basic ${token}`
}

export const frequencies = [
    {
        label: "Everytime (everyone)",
        value: "10023"
    },
    {
        label: "Sometimes (everyone)",
        value: "10024"
    },
    {
        label: "Everytime (some)",
        value: "10025"
    },
    {
        label: "Everyime/Always (one user)",
        value: "10027"
    }
]

export const severites = [
    {
        label: "Unusable",
        value: "10028"
    },
    {
        label: "Gray screen",
        value: "10030"
    }
    , {
        label: "Data",
        value: "10032"
    },
    {
        label: "Malfunctioning",
        value: "10033"
    },
    {
        label: "Layout Issue",
        value: "10034"
    }
]