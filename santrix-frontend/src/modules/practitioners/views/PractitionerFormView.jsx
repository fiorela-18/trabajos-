import { 
  Box, Heading, VStack, FormControl, FormLabel, Input, Select, 
  Button, Flex, useToast, Textarea
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

// Mock data for edit mode
const mockPractitionerData = {
    101: { name: 'Laura Mendoza', role: 'External Consultant', project: 'IT Modernization', contractDate: '2024-03-10', description: 'Expert consultant in cloud services migration.' },
    102: { name: 'Jorge Castro', role: 'Intern', project: 'Digital Marketing', contractDate: '2024-06-01', description: 'Intern focused on social media data analysis.' },
};

export default function PractitionerFormView({ isEdit = false }) { 
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    project: '',
    contractDate: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Effect to load data if in edit mode
  useEffect(() => {
    if (isEdit && id) {
      if (mockPractitionerData[id]) {
        setFormData(mockPractitionerData[id]);
      } else {
        toast({
          title: 'Load Error',
          description: `Practitioner with ID ${id} not found.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [isEdit, id, navigate, toast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated submission
    setTimeout(() => {
      setIsLoading(false);
      
      const action = isEdit ? 'Updated' : 'Created';
      
      toast({
        title: `Practitioner ${action}.`,
        description: `Practitioner ${formData.name} has been ${action.toLowerCase()} successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/practitioners', { replace: true });
    }, 1500);
  };

  return (
    <Box p={6}>
      <Flex mb={8} align="center">
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          onClick={() => navigate('/practitioners')}
        >
          Back to List
        </Button>
        <Heading size="lg" ml={4}>
          {isEdit ? `Edit Practitioner (ID: ${id})` : 'Register New Practitioner'} 
        </Heading>
      </Flex>

      <Box 
        p={6} 
        maxWidth="900px" 
        borderWidth={1} 
        borderRadius="lg" 
        bg="white" 
        shadow="md"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Laura Mendoza"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Role or Position</FormLabel>
              <Input 
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Ex: External Consultant"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Assigned Project</FormLabel>
              <Select 
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="Select a project"
              >
                <option value="IT Modernization">IT Modernization</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Web Design">Web Design</option>
              </Select>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Contract Date</FormLabel>
              <Input 
                name="contractDate"
                type="date"
                value={formData.contractDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail of responsibilities..."
              />
            </FormControl>
            
            <Flex justify="flex-end" pt={4}>
              <Button 
                type="submit" 
                colorScheme="teal" 
                leftIcon={<FiSave />}
                isLoading={isLoading}
              >
                {isEdit ? 'Update Practitioner' : 'Save Practitioner'}
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}