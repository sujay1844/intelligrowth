"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const items = [
    { label: "Enforcing Fundamental Duties ", id: "EnforcingFundamentalDuties.txt " },
    { label: "Hijab & Freedom of Religion", id: "HijabandFreedomofReligion.txt" },
    { label: "Public Order", id: "PublicOrder.txt" },
    { label: "Right to Protest ", id: "RightToProtest.txt " },
    { label: "Government Aid Not a Fundamental Right: SC ", id: "GovernmentAidNotaFundamentalRight:SC.txt " },
    { label: "Fundamental Rights to Reside and to Move About Freely . ", id: "FundamentalRightstoResideandtoMoveAboutFreely.txt" },
    { label: "SC Judgement on Preventive Detention ", id: "SCJudgementonPreventiveDetention.txt " },
    { label: "Uniform Civil Code ", id: "UniformCivilCode.txt" },
    { label: "Minority Educational Institutions and Right to Education ", id: "MinorityEducationalInstitutionsandRighttoEducation.txt" },
    { label: "Right to Privacy ", id: "RighttoPrivacy.txt" },
    { label: "Right to Forgotten ", id: "RighttoForgotten.txt " },
    { label: "Right of Reputation vs Right to Dignity ", id: "RightofReputationvsRighttoDignity.txt " },
    { label: "Free Legal Aid ", id: "FreeLegalAid.txt" },
    { label: "Lok Adalat ", id: "LokAdalat.txt" },
    { label: "Draft Anti-Conversion Bill: Haryana ", id: "DraftAnti-ConversionBill:Haryana.txt" },
    { label: "Role and Power of Governor ", id: "RoleandPowerofGovernor.txt" },
    { label: "Governor’s Role in Universities ", id: "Governor’sRoleinUniversities.txt" },
    { label: "Governor’s Power to decide on Bills: Veto Power ", id: "Governor’sPowertodecideonBills:VetoPower.txt " },
    { label: "Chief Minister ", id: "ChiefMinister.txt " },
    { label: "Union' or 'Central' Government ", id: "Union'or'Central'Government.txt" },
    { label: "Interim Report of J&K Delimitation Commission ", id: "InterimReportofJ&KDelimitationCommission.txt" },
    { label: "Assam-Meghalaya Border Dispute ", id: "Assam-MeghalayaBorderDispute.txt" },
    { label: "Krishna Water Dispute ", id: "KrishnaWaterDispute.txt" },
    { label: "Statehood Demand by Puducherry ", id: "StatehoodDemandbyPuducherry.txt " },
    { label: "Belagavi Border Dispute ", id: "BelagaviBorderDispute.txt" },
    { label: "Demand for Including Ladakh under Sixth Schedule ", id: "DemandforIncludingLadakhunderSixthSchedule.txt" },
    { label: "Special Category Status ", id: "SpecialCategoryStatus.txt" },
    { label: "E-ILP Platform: Manipur ", id: "E-ILPPlatform:Manipur.txt" },
    { label: "Legislative Council ", id: "LegislativeCouncil.txt" },
    { label: "Government of NCT of Delhi (Amendment) Act 2021", id: "GovernmentofNCTofDelhi(Amendment)Act2021.txt" },
    { label: "National Panchayati Raj Day ", id: "NationalPanchayatiRajDay.txt " },

] as const

const FormSchema = z.object({
    topics: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

export default function CheckboxReactHookFormMultiple({ setTopics }: { setTopics: (value: any) => void }) {
    const { push } = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            topics: [],
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setTopics(data.topics)

        data.topics = data.topics.map((topic) => {
            return "./data/" + topic
        })

        alert(JSON.stringify(data, null, 4))
        
        fetch('http://localhost:8000/qa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: 5,
                topics: data.topics,
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            push('/question?n=1')
        }).catch(err => console.log(err))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="topics"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Topics</FormLabel>
                                <FormDescription>
                                    Select the topics you want to learn about.
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="topics"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-48 bg-gradient-to-r from-orange-400 to-green-400 text-black" type="submit">Submit</Button>
            </form>
        </Form>
    )
}