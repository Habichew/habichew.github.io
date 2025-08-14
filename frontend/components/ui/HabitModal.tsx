import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    Platform,
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDropdown from './select';
import {webDateInputWrapper, webDateInput} from './webDateStyles';
import {useFocusEffect} from "@react-navigation/native";
import {ScaledSheet} from "react-native-size-matters";
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
    visible: boolean;
    initialData?: {
        habitTitle?: string;
        goalDate?: string | null;
        priority?: number | null;
        frequency?: string | null;
        tasks?: string[] | null;
    };
    onClose: () => void;
    onSave: (data: {
        habitTitle: string;
        goalDate?: string | null;
        startDate: string;
        priority?: number | null;
        frequency?: string | null;
        tasks?: string[];
    }) => void;
    onDelete?: (habitId: number) => void | Promise<void>;
    habitId?: number;
};

const HabitModal: React.FC<Props> = ({visible, initialData, onClose, onSave, onDelete, habitId}) => {
    const isEdit = !!initialData;
    const [formData, setFormData] = useState<any>({
        habitTitle: '',
        goalDate: '',
        priority: '',
        frequency: '',
        tasks: []
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
    const [savingOrCreating, setSavingOrCreating] = useState<boolean>(false);
    const windowHeight = Dimensions.get('window').height;

    const inputRef = useRef(null); // Attach a ref to the TextInput

    useFocusEffect(() => {
        // setTimeout(() => {
        //     inputRef.current?.focus()
        // }, 50)  // Delay the focus by 50ms to allow modal to complete its render
    })

    useEffect(() => {
        if (initialData) {
            const formatDate = (d: string | Date) => new Date(d).toISOString().split('T')[0];
            setFormData({
                habitTitle: initialData.habitTitle || '',
                goalDate: initialData.goalDate ? formatDate(initialData.goalDate) : '',
                priority: initialData.priority != null ? reversePriorityMap[initialData.priority] : '',
                frequency: initialData.frequency || '',
                tasks: initialData.tasks
            });
        } else {
            setFormData({habitTitle: '', goalDate: '', priority: '', frequency: ''});
        }
    }, [initialData]);

    const reversePriorityMap: Record<number, string> = {1: 'High', 2: 'Medium', 3: 'Low'};
    const priorityMap: Record<string, number> = {Low: 3, Medium: 2, High: 1};

    const handleSave = () => {
        if (!formData.habitTitle) return alert('Please enter a habit name.');
        const today = new Date().toISOString().split('T')[0];
        setSavingOrCreating(true);
        onSave({
            habitTitle: formData.habitTitle,
            goalDate: formData.goalDate || null,
            startDate: today,
            priority: formData.priority ? priorityMap[formData.priority] : null,
            frequency: formData.frequency || null,
            tasks: generatedTasks || null
        });
        setSavingOrCreating(false);
        setGeneratedTasks([]);
        onClose();
    };

    function addTaskInput() {
        setGeneratedTasks([...generatedTasks, ""]);
    }

    function handleChangeTask(text: string, i: number) {
        console.log("changing text at index", i, " to ", text);
        let newTasks = generatedTasks;
        newTasks = newTasks.map((value, index, array) => {
            if (index === i) {
                return text;
            }
            return value;
        });
        setGeneratedTasks(newTasks);
    }

    function handleGenerateTasks() {
        if (!formData.habitTitle) return alert('Please enter a habit name.');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + process.env.EXPO_PUBLIC_OPENAI_API_KEY);

        const raw = JSON.stringify({
            "model": "gpt-4.1",
            "messages": [
                {
                    "role": "user",
                    "content": "In short sentences, break down this habit into a bulleted list of max. 6 tasks that are directly executable: '" + formData.habitTitle + "'. Only respond with a bulleted list"
                }
            ]
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // setGeneratedTasks(["Find a private or comfortable space", "Acknowledge your emotions", "Allow your feelings to flow without holding back", "Breathe deeply and steadily", "Use tissues or a cloth if needed", "Take time afterwards to rest or reflect"]);
        setLoadingTasks(true);
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                let newTasks = result.choices[0].message.content;
                newTasks = newTasks.split("\n").map((t: string) => {
                    if (t.startsWith("- ")) {
                        return t.slice(2);
                    }
                    return t;
                })
                setGeneratedTasks(newTasks);
                console.log("set generated tasks", newTasks, "length", newTasks.length);
                setLoadingTasks(false);
            })
            .catch((error) => {
                console.error(error);
                setLoadingTasks(false);
            });
    }



    const renderTask = (item: any, index: number) => {
        console.log("task index", index, "item", item);

        function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
            const styleAnimation = useAnimatedStyle(() => {
                console.log('showRightProgress:', prog.value);
                console.log('appliedTranslation:', drag.value);

                return {
                    transform: [{ translateX: drag.value + 50 }],
                };
            });

            return (
                <Reanimated.View style={styleAnimation}>
                    <Text>Text</Text>
                </Reanimated.View>
            );
        }

        return (
            // <ReanimatedSwipeable>
                <View style={styles.task}>
                    <TextInput placeholderTextColor="gray" style={{backgroundColor: 'white', padding: 4, color: 'black'}}
                               placeholder={"Task name"} value={item} onChangeText={text => handleChangeTask(text, index)}>
                    </TextInput>
                </View>
            // </ReanimatedSwipeable>
            // <GestureHandlerRootView>
            //     <ReanimatedSwipeable
            //         friction={1}
            //         enableTrackpadTwoFingerGesture
            //         rightThreshold={40}
            //         renderRightActions={RightAction}
            //         containerStyle={styles.task}
            //     >
            //         <Text>Swipe me!</Text>
            //     </ReanimatedSwipeable>
            // </GestureHandlerRootView>


        );
    };

    return (
        <Modal onRequestClose={() => {
            onClose();
            setGeneratedTasks([])
        }} visible={visible} transparent animationType="slide">
            <TouchableOpacity activeOpacity={1} style={styles.overlay} onPressOut={() => {
                onClose();
                setGeneratedTasks([]);
            }}>
                <View
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={{maxHeight: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                            <View style={styles.modal}>
                                <View style={styles.modalHeader}>
                                    <View style={styles.titleRow}>
                                        <TextInput ref={inputRef} autoFocus={true} placeholder="Habit title"
                                                   placeholderTextColor="#1C1A1F" style={styles.title}
                                                   value={formData.habitTitle}
                                                   onChangeText={text => setFormData({...formData, habitTitle: text})}/>
                                        {/*<TextInput ref={inputRef} autoFocus={true} placeholder="Habit description"*/}
                                        {/*           placeholderTextColor="#1C1A1F" style={styles.description}*/}
                                        {/*           value={formData.habitDescription} onChangeText={text => setFormData({*/}
                                        {/*    ...formData,*/}
                                        {/*    habitDescription: text*/}
                                        {/*})}/>*/}
                                        {isEdit ? (
                                            <TouchableOpacity onPress={() => setShowConfirmDelete(true)}>
                                                <Ionicons name="trash-outline" size={24} color="#555"/>
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={{width: 24}}/>  // align
                                        )}
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flexWrap: 'wrap',
                                        flexShrink: 1,
                                        marginVertical: 20
                                    }}>
                                        {Platform.OS === 'web' ? (
                                            <View style={webDateInputWrapper}>
                                                <input type="date" value={formData.goalDate}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           goalDate: e.target.value
                                                       })}
                                                       style={{
                                                           ...webDateInput,
                                                           color: formData.goalDate ? '#000' : '#bbb'
                                                       }}/>
                                            </View>
                                        ) : (
                                            <>
                                                <TouchableOpacity style={[styles.tag, {
                                                    color: formData.goalDate ? 'black' : '#bbbbbb',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }]} onPress={() => setShowDatePicker(true)}>
                                                    <Ionicons name="calendar-outline" size={24} color="#555"
                                                              style={{marginRight: 5}}/>
                                                    <Text>{formData.goalDate ? new Date(formData.goalDate).toLocaleDateString() : 'Due Date'}</Text></TouchableOpacity>
                                                {showDatePicker && (
                                                    <DateTimePicker
                                                        value={formData.goalDate ? new Date(formData.goalDate) : new Date()}
                                                        mode="date" display="calendar"
                                                        onChange={(event: any, selectedDate: Date | undefined) => {
                                                            setShowDatePicker(false);
                                                            if (selectedDate) {
                                                                const y = selectedDate.getFullYear(),
                                                                    m = selectedDate.getMonth() + 1,
                                                                    d = selectedDate.getDate();
                                                                const formattedDate = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                                                                setFormData({...formData, goalDate: formattedDate});
                                                            }
                                                        }}/>
                                                )}
                                            </>
                                        )}
                                        <CustomDropdown zIndex={4} zIndexInverse={3}
                                                        items={[{label: 'Low', value: 'Low'}, {
                                                            label: 'Medium',
                                                            value: 'Medium'
                                                        }, {label: 'High', value: 'High'}]} value={formData.priority}
                                                        setValue={val => val && setFormData({
                                                            ...formData,
                                                            priority: val
                                                        })}
                                                        placeholder="Priority" style={{maxWidth: "30%", height: 36}}
                                                        icon={<View/>}/>
                                        <CustomDropdown zIndex={2} zIndexInverse={1}
                                                        items={[{label: 'Daily', value: 'Daily'}, {
                                                            label: 'Weekly',
                                                            value: 'Weekly'
                                                        }, {label: 'Monthly', value: 'Monthly'}]}
                                                        value={formData.frequency}
                                                        setValue={val => val && setFormData({
                                                            ...formData,
                                                            frequency: val
                                                        })}
                                                        placeholder="Frequency" style={{maxWidth: "34%"}}/>
                                    </View>
                                </View>
                                <View style={styles.modalBody}>
                                    <View style={{flexDirection: "row", minHeight: 50, alignItems: "center"}}>
                                        <Text style={styles.taskTitle}>Tasks</Text>
                                        {/*<TouchableOpacity style={{marginLeft: "auto", marginVertical: "auto"}} onPress={() => setGeneratedTasks([])}>*/}
                                        {/*  <Ionicons name="trash-outline" size={24} color="#000"/>*/}
                                        {/*</TouchableOpacity>*/}
                                        <TouchableOpacity style={{marginLeft: "auto", marginVertical: "auto", width: 30, height: 30}}
                                                          onPress={() => addTaskInput()}>
                                            <Ionicons name="add" size={24} color="#000"/>
                                        </TouchableOpacity>
                                    </View>
                                    {loadingTasks ? <ActivityIndicator size={"large"}/>
                                        :
                                        (generatedTasks.length === 0 ? (
                                                    <>
                                                        <Text style={{marginHorizontal: "auto", marginVertical: 20}}>No
                                                            tasks created.</Text>
                                                        <TouchableOpacity style={styles.generateTextBtn}
                                                                          onPress={handleGenerateTasks}><Text
                                                            style={styles.generateText}>Generate
                                                            Tasks</Text></TouchableOpacity>
                                                    </>
                                                ) :
                                                (<FlatList data={generatedTasks} keyExtractor={(item, index) => index}
                                                           renderItem={({
                                                                            item,
                                                                            index,
                                                                            separators
                                                                        }) => renderTask(item, index)}
                                                           style={{maxHeight: windowHeight / 3}}></FlatList>)
                                        )
                                    }
                                    <View style={styles.buttons}>
                                        {/*<TouchableOpacity style={styles.cancelBtn} onPress={() => {onClose(); setGeneratedTasks([])}}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>*/}
                                        <TouchableOpacity onPress={handleSave} style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 24
                                        }}>
                                            <Text
                                                style={styles.saveText}>{isEdit ? 'Save' : 'Create'}</Text>
                                            <Ionicons name="return-down-forward-outline" size={24} color="#555"
                                                      style={{marginTop: 4}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {showConfirmDelete && (
                                    <View style={styles.confirmOverlay}>
                                        <View style={styles.confirmBox}>
                                            <Text style={styles.confirmText}>Are you sure you want to delete this
                                                habit?{'\n'}All related tasks will be deleted.</Text>
                                            <View style={styles.confirmButtons}>
                                                <TouchableOpacity style={styles.cancelBtn}
                                                                  onPress={() => setShowConfirmDelete(false)}><Text
                                                    style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.saveBtn} onPress={() => {
                                                    if (onDelete && habitId) {
                                                        onDelete(habitId);
                                                        setShowConfirmDelete(false);
                                                        onClose();
                                                    }
                                                }}><Text style={styles.saveText}>Delete</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default HabitModal;

const styles = ScaledSheet.create({
    overlay: {flexDirection: 'row', flex: 1, alignItems: 'flex-end', overflow: 'hidden', marginTop: "auto"},
    modal: {backgroundColor: '#dab7ff', borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'relative'},
    title: {fontSize: "20@ms", fontWeight: 'bold', marginBottom: 0, marginRight: 20},
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 24,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginBottom: 16
    },
    tag: {
        backgroundColor: '#F8F0F0',
        borderRadius: 24,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: '13@ms',
        textAlignVertical: 'center',
        textAlign: 'left',
        justifyContent: 'center'
    },
    buttons: {flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20},
    cancelBtn: {backgroundColor: '#000', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24},
    cancelText: {fontSize: 20, color: '#dab7ff', fontWeight: 'bold'},
    saveBtn: {backgroundColor: '#1CC282', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24},
    saveText: {fontSize: 20, color: '#000', fontWeight: 'bold', marginRight: 5},
    generateTextBtn: {
        backgroundColor: '#1CC282',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: "auto",
        borderRadius: 24
    },
    generateText: {fontSize: 16, color: '#000', fontWeight: 'bold', maxWidth: "75%"},
    deleteIcon: {position: 'absolute', top: 16, right: 16},
    confirmOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
    confirmBox: {backgroundColor: '#fff', padding: 24, borderRadius: 24, width: '80%', alignItems: 'center'},
    confirmText: {fontSize: 16, color: '#000', marginBottom: 16, textAlign: 'center'},
    confirmButtons: {flexDirection: 'row', justifyContent: 'space-between', width: '100%'},
    titleRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'},
    taskTitle: {fontWeight: 'bold', fontSize: 18, height: 30},
    task: {
        backgroundColor: '#fff',
        padding: 16,
        paddingVertical: 12,
        borderRadius: 24,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginBottom: 6
    },
    description: {fontWeight: 'normal', fontSize: "13@ms"},
    modalHeader: {padding: 24, paddingBottom: 12},
    modalBody: {padding: 24, paddingTop: 12, borderTopWidth: 1}
});
