export const jsonToLogicalString = (jsonData, indent = 0) => {
    let logicalString = "";
    const indentation = "  ".repeat(indent);

    for (const key in jsonData) {
        if (Array.isArray(jsonData[key])) {
            logicalString += `${indentation}${key}:\n`;
            jsonData[key].forEach(item => {
                logicalString += jsonToLogicalString(item, indent + 1);
            });
        } else if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
            logicalString += `${indentation}${key}:\n`;
            logicalString += jsonToLogicalString(jsonData[key], indent + 1);
        } else {
            logicalString += `${indentation}${key}: ${jsonData[key]}\n`;
        }
    }

    return logicalString;
};

export const generateDetailedDescription = (data) => {
    let description = '';
    console.log(data);
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const dataset = data[key].datasets[0];
            description += `${dataset.label}:\n`;
            description += `${dataset.description}\n`;
            dataset.data.forEach((value, index) => {
                description += `${data[key].labels[index]}: ${value}\n`;
            });
            description += `Summary: ${dataset.summary}\n`;
            description += `Filter Criteria: ${dataset.filterCriteria}\n`;
            description += `Prompt: ${dataset.prompt}\n\n`;
        }
    }

    return description;
};

export const generateMonitoringDetailedDescription = (data) => {
    return JSON.stringify(data);
};